import React, { useState, useEffect } from "react";
import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

import './PaymentForm.css';

function PaymentForm() {
  const [clientSecret, setClientSecret] = useState(null);

  const stripePromise = loadStripe(
    process.env.stripe_pk
  );
  const options = {
    clientSecret: clientSecret,
  };

  useEffect(() => {
    fetch(process.env.server_base + "/api/v1/subscription/getsecretkey", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        options.clientSecret = data.clientSecret;
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  return (
    <div className="payment-form">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={options.clientSecret} />
        </Elements>
      )}
    </div>
  );
}

export default PaymentForm;
