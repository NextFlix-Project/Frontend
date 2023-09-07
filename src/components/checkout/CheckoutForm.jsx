import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
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
      base: {
      //  color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
       //   color: "#aab7c4",
        },
      },
      invalid: {
   //     color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

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

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const confirmPayment = async (clientSecret) => {
    const confirmPayment = await stripe.confirmCardPayment(clientSecret);

    if (confirmPayment?.error) {
      alert(confirmPayment.error.message);
    } else {
       navigate("/completed");
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
 
        confirmPayment(response.data.clientSecret);

    
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
          minWidth: "400px",
          mx: "auto",
          overflow: "auto",
          resize: "none",
        }}
      >
        <Typography level="title-lg" startDecorator={<SubscriptionsIcon />}>
          Subscribe
        </Typography>
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

            <FormLabel style={{ paddingTop: "2%", paddingBottom: "2%" }}>
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
            <CardActions sx={{ gridColumn: "1/-1", width: "10ch" }}>
              <Button variant="solid" color="danger">
                Cancel
              </Button>
            </CardActions>
            <CardActions
              sx={{ gridColumn: "1/-1", width: "10ch", paddingRight: "2ch" }}
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
