import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Input } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SubscriptRounded } from "@mui/icons-material";

function CheckoutForm() {
  const [subscription, setSubsription] = useState({
    subscription: {
      productId: null,
    },
    user: {
      firstName: null,
      lastName: null,
      email: null,
    },
  });

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/v1/subscription/getsubscription", {
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
        setSubsription(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  const confirmPayment = async (clientSecret) => {
    const confirmPayment = await stripe.confirmCardPayment(clientSecret);

    if (confirmPayment?.error) {
      alert(confirmPayment.error.message);
    } else {
      alert("Success! Check your email for the invoice.");
    }
  };
  const subscribe = async (custId) => {
    await axios
      .post(
        "http://127.0.0.1:8080/api/v1/subscription/subscribe",
        {
          customerId: custId.stripeCustomerId,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        confirmPayment(response.data.clientSecret);

        //  if (response.status === 200) navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const purchaseSubscription = async () => {
    try {
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name: subscription.user.firstName + " " + subscription.user.lastName,
          email: subscription.user.email,
        },
      });

      const response = await axios
        .post(
          "http://127.0.0.1:8080/api/v1/customer/createcustomer",
          {
            paymentId: paymentMethod.paymentMethod.id,
            name:
              subscription.user.firstName + " " + subscription.user.lastName,
            email: subscription.user.email,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          subscribe(response.data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CardElement />
      <button onClick={purchaseSubscription} disabled={!stripe}>
        Subscribe
      </button>
    </div>
  );
}

export default CheckoutForm;
