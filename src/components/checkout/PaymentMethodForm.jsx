import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { loadStripe } from "@stripe/stripe-js";

function PaymentMethodForm() {
  const [clientSecret, setClientSecret] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [expirationMonth, setExpirationMonth] = useState(null);
  const [expirationYear, setExpirationYear] = useState(null);
  const [cvc, setCVC] = useState(null);
  const [name, setName] = useState(null);

  const navigate = useNavigate();

  const stripePromise = loadStripe(
    "pk_test_51NX6dVJuwHGxhn37cRYeRkMNeKWCHNrqTlEVkHLPoAYwXNIESmMppgjeG0oYISdeg2fiVFPJYSyaR6gYrNBubMZE00aidoSyWd"
  );
  const options = {
    clientSecret: clientSecret,
  };

  const handleCardNumberChange = (e) => {
    e.preventDefault();
    setCardNumber(e.target.value);
  };
  const handleExpirationMonthChange = (e) => {
    e.preventDefault();
    setExpirationMonth(e.target.value);
  };

  const handleExpirationYearChange = (e) => {
    e.preventDefault();
    setExpirationYear(e.target.value);
  };

  const handleCvcChange = (e) => {
    e.preventDefault();
    setCVC(e.target.value);
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const subscribe = () => {
    axios
    .post(
      "http://127.0.0.1:8080/api/v1/subscription/subscribe",
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
  }

  const createCustomer = () => {
    axios
    .post(
      "http://127.0.0.1:8080/api/v1/customer/createcustomer",{
        name: name,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log(response.data);
      if (response.status === 200)
        subscribe();
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
  }

  const createPaymentMethod = () => {
    axios
    .post(
      "http://127.0.0.1:8080/api/v1/customer/createpayment",{
        creditCardNumber: cardNumber,
        expirationMonth: expirationMonth,
        expirationYear: expirationYear,
        cvc: cvc
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log(response.data);
      if (response.status === 200) 
        createCustomer();
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          maxHeight: "max-content",
          maxWidth: "100%",
          mx: "auto",
          overflow: "auto",
          resize: "horizontal",
        }}
      >
        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
          Add new card
        </Typography>
        <Divider inset="none" />
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
            gap: 1.5,
          }}
        >
          <FormControl onChange={handleCardNumberChange} sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Card number</FormLabel>
            <Input endDecorator={<CreditCardIcon />} />
          </FormControl>
          <FormControl onChange={handleExpirationMonthChange}>
            <FormLabel>Expiration Month</FormLabel>
            <Input endDecorator={<CreditCardIcon />} />
          </FormControl>

          <FormControl onChange={handleExpirationYearChange}>
            <FormLabel>Expiration Year</FormLabel>
            <Input endDecorator={<CreditCardIcon />} />
          </FormControl>
          <FormControl onChange={handleCvcChange}>
            <FormLabel>CVC/CVV</FormLabel>
            <Input endDecorator={<InfoOutlined />} />
          </FormControl>
          <FormControl onChange={handleNameChange} sx={{ gridColumn: "1/-1" }}>
            <FormLabel>Card holder name</FormLabel>
            <Input placeholder="Enter cardholder's full name" />
          </FormControl>
          <Box
            sx={{
              minWidth: "200%",
              display: "flex",
              flexDirection: "row-reverse",
              background: "white",
            }}
          >
            <CardActions sx={{ gridColumn: "1/-1" , width: "10ch" }}>
              <Button  variant="solid" color="danger">
                Cancel
              </Button>
            </CardActions>
            <CardActions sx={{ gridColumn: "1/-1", width: "10ch", paddingRight:"2ch" }}>
              <Button type="submit" onClick={createPaymentMethod} variant="solid" color="primary">
                Add
              </Button>
            </CardActions>
 
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentMethodForm;
