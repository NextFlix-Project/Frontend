import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const CARD_ELEMENT_OPTIONS = {
    style: {
      theme: "night",
      base: {
        color: "white",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  useEffect(() => {
    fetch(process.env.server_base + "/api/v1/subscription/getsubscription", {
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

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const confirmPayment = async (clientSecret) => {
    const confirmPayment = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(function (result) {
        // Handle result.error or result.paymentIntent
      });

    if (confirmPayment?.error) {
      alert(confirmPayment.error.message);
    } else {
      navigate("/completed");
    }
  };
  const subscribe = async (custId) => {
    await axios
      .post(
        process.env.server_base + "/api/v1/subscription/subscribe",
        {
          customerId: custId.stripeCustomerId,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        confirmPayment(response.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
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
          process.env.server_base + "/api/v1/customer/createcustomer",
          {
            paymentId: paymentMethod.paymentMethod.id,
            name: name,
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
    <>
      <Card
        variant="outlined"
        sx={{
          maxHeight: "max-content",
          maxWidth: "100%",
          minWidth: "600px",
          minHeight: "300px",
          mx: "auto",
          overflow: "auto",
          resize: "none",
          borderRadius: "15px",
          backgroundColor: "rgb(50,50,50)",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <SubscriptionsIcon sx={{ height: "50px", marginRight: "15px" }} />{" "}
          <Typography
            align="center"
            sx={{ paddingTop: "15px", height: "50px", textAlign: "center" }}
          >
            Subscribe{" "}
          </Typography>
        </div>

        <Divider inset="none" />
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
            gap: 1.5,
          }}
        >
          <FormControl onChange={handleNameChange} sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Card holder name</FormLabel>

            <Input placeholder="Enter cardholder's full name" />

            <FormLabel style={{ paddingTop: "5%", paddingBottom: "2%" }}>
              Card details
            </FormLabel>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </FormControl>

          <Box
            sx={{
              minWidth: "200%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <CardActions
              sx={{
                gridColumn: "1/-1",
                width: "10ch",
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              <Button variant="solid" color="danger" onClick={handleCancel}>
                Cancel
              </Button>
            </CardActions>
            <CardActions
              sx={{
                gridColumn: "1/-1",
                width: "10ch",
                paddingRight: "2ch",
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              <Button
                type="submit"
                onClick={purchaseSubscription}
                variant="solid"
                color="primary"
              >
                Subscribe
              </Button>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default CheckoutForm;
