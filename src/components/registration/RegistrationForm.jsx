import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";

function RegistrationForm() {
  const [email, setEmail] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();

  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const navigate = useNavigate();
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/v1/auth/authenticated", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const register = (e) => {
    e.preventDefault();

    if (password1 !== password2) return;
    axios
      .post(
        "http://127.0.0.1:8080/api/v1/auth/register",
        {
          email: email,
          password: password1,
          firstName: firstname,
          lastName: lastname,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) navigate("/subscribe");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const handleFirstNameChange = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange1 = (e) => {
    e.preventDefault();
    setPassword1(e.target.value);
  };

  const handlePasswordChange2 = (e) => {
    e.preventDefault();
    setPassword2(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        width: "35ch",
        display: "flex",
        padding: "5ch",
        borderRadius: "10px",
        flexDirection: "column",
        flexGrow: 1,
        flexBasis: 0,
       }}
      noValidate
      autoComplete="off"
      onSubmit={register}
    >
      <FormLabel
        id="demo-radio-buttons-group-label"
        sx={{
          fontSize: "3ch",
          textAlign: { sm: "left" },
          paddingBottom: "2ch",
        }}
      >
        Register
      </FormLabel>

      <TextField
        required
        focused={true}
        sx={{ paddingBottom: "1ch" }}
        id="outlined-basic"
        label="first name"
        variant="outlined"
        onChange={handleFirstNameChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        required
        sx={{ paddingBottom: "1ch" }}
        id="outlined-basic"
        label="last name"
        variant="outlined"
        onChange={handleLastNameChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        required
        sx={{ paddingBottom: "1ch" }}
        id="outlined-basic"
        label="email"
        variant="outlined"
        onChange={handleEmailChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />

      <FormControl sx={{ paddingBottom: "1ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          required
          id="outlined-adornment-password"
          type={showPassword1 ? "text" : "password"}
          onChange={handlePasswordChange1}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword1}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword1 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <FormControl sx={{ paddingBottom: "1ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          required
          id="outlined-adornment-password"
          type={showPassword2 ? "text" : "password"}
          onChange={handlePasswordChange2}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword2}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword2 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Button
        type="submit"
        sx={{ marginTop: "5ch" }}
        variant="contained"
        color="primary"
        onClick={register}
      >
        Register{" "}
      </Button>
    </Box>
  );
}

export default RegistrationForm;
