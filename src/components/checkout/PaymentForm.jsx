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
    mode: 'setup',
    currency: 'usd',
  };
  

  useEffect(() => {
 
  }, []);

  return (
    <div className="payment-form">
       
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
  
    </div>
  );
}

export default PaymentForm;
