import React, { useState, useEffect, StrictMode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import Routes from "./router/Routes";

import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const router = createBrowserRouter(Routes);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router}>
          <div className="main"></div>
        </RouterProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
