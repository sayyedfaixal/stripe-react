import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState({
    name: "react from fb",
    price: 10,
    productBy: "facebook",
  });
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Response", response);
        const { status } = response;
        console.log("Status", status);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
        <StripeCheckout
          stripeKey="pk_test_51JhpdvSCrFYNwFRqf4b3wllroPcYE9crC5sy0q7YqAPeVaImC9tJxFX0n9DuEq2RTSQEZHoXKSfWptpGq9sleFkx00unWROf2i"
          token={makePayment}
          name="Buy react"
          amount={product.price * 100}
          // shippingAddress
          // billingAddress
        >
          <button className="btn-large pink">
            Buy React in ${product.price}
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
