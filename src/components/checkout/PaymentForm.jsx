import React, { useState, useEffect } from "react";
import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

function PaymentForm() {
  const [clientSecret, setClientSecret] = useState(null);

  const stripePromise = loadStripe(
    "pk_test_51NX6dVJuwHGxhn37cRYeRkMNeKWCHNrqTlEVkHLPoAYwXNIESmMppgjeG0oYISdeg2fiVFPJYSyaR6gYrNBubMZE00aidoSyWd"
  );
  const options = {
    clientSecret: clientSecret,
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/v1/subscription/getsecretkey", {
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
        console.log(data);
        options.clientSecret = data.clientSecret;
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={options.clientSecret} />
        </Elements>
      )}
    </div>
  );
}

export default PaymentForm;
