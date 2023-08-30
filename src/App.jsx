import React, { useState, useEffect } from 'react';
 
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Routes from './router/Routes';
import "./App.css";

function App() {

  const router = createBrowserRouter(Routes);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  return (
       <RouterProvider router={router}>
 
<div></div>
 
      </RouterProvider>
   );
}

export default App;
