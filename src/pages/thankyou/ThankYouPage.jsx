import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYouPage.css";

import axios from "axios";

function ThankYouPage() {
  const queryParameters = new URLSearchParams(window.location.search);
  const payment_intent = queryParameters.get("payment_intent");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(
        "http://127.0.0.1:8080/api/v1/subscription/confirmsubscription",
        {
          intent: payment_intent,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) setTimeout(() => navigate("/"), 5000);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setTimeout(() => navigate("/"), 5000);
      });
  }, []);

  return (
    <div id="thank-you-page">
      <div class="thank-you-msg">THANK YOU FOR SUBSCRIBING</div>
    </div>
  );
}

export default ThankYouPage;
