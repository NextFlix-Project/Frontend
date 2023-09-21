import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
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

function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    axios
      .get(process.env.server_base + "/api/v1/auth/authenticated", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  const login = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.server_base + "/api/v1/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        width: "50ch",
        display: "flex",
        padding: "5ch",
        backgroundColor: "rgb(25,25,25)",
        borderRadius: "10px",
        flexDirection: "column",
        flexGrow: 1,
        flexBasis: 0,
        outline: "1px",
        outlineColor: "white",
        outlineStyle: "solid",
      }}
      noValidate
      autoComplete="off"
      onSubmit={login}
    >
      <FormLabel
        id="demo-radio-buttons-group-label"
        sx={{
          fontSize: "3ch",
          textAlign: { sm: "left" },
          paddingBottom: "2ch",
        }}
      >
        Sign In
      </FormLabel>

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
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />

      <FormControl
        sx={{ paddingBottom: "3ch", marginTop: "2ch" }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          required
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={handlePasswordChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Button
        type="submit"
        sx={{ marginBottom: "5ch" }}
        variant="contained"
        color="primary"
        onClick={login}
      >
        Sign in
      </Button>
      <Box
        sx={{
          width: "35ch",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <FormLabel
          id="demo-radio-buttons-group-label"
          sx={{
            fontSize: "1.75ch",
            textAlign: { sm: "left" },
            paddingRight: "1ch",
          }}
        >
          New to Nextflix?
        </FormLabel>
        <Link
          href="/register"
          sx={{
            fontSize: "1.75ch",
            textAlign: { sm: "left" },
            paddingBottom: "ch",
          }}
        >
          Sign up now
        </Link>
      </Box>
    </Box>
  );
}

export default LoginForm;
