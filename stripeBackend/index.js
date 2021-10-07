const cors = require("cors");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const stripe = require("stripe")(
  "sk_test_51JhpdvSCrFYNwFRqDo77FQut52bUoY2V7K9GeehzqpFPu3uKCUg5m1k4eo0joNRr9Jd0JDRNMC0JzaUprnKklWVR005BxDRA9d"
);
// uuidv4();
const app = express();

//Middle ware
app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("It works ");
});

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("Product", product);
  console.log("Price", product.price);
  //This keep the track the user is not charges twice for the same product
  const idempontencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});
//Listen
app.listen(8282, () => console.log("LISTENING AT PORT 8282"));
