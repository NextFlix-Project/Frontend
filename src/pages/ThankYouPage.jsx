import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

  function ThankYouPage() {

    const queryParameters = new URLSearchParams(window.location.search);
    const payment_intent = queryParameters.get("payment_intent");
    const navigate = useNavigate();


  useEffect(() => {
    console.log(payment_intent)

    axios
    .post(
        "http://127.0.0.1:8080/api/v1/subscription/confirmsubscription",
      {
        intent:payment_intent
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log(response.data);
      if (response.status === 200)  
      navigate("/");
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });

    
  }, []);


  return (
    <>
     Thank you for subscribing!!!
    </>
  );
}



export default ThankYouPage;
 