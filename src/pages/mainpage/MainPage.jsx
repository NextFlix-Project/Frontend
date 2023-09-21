import React, { useState, useEffect } from "react";
import "./MainPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MovieSelectList from "../../components/movies/MovieSelectList";

function MainPage() {
  const [subscribed, setSubscribed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(process.env.server_base + "/api/v1/subscription/isactive", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.data !== true) navigate("/subscribe");

        setSubscribed(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  const renderMovieList = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MovieSelectList />
      </div>
    );
  };

  if (subscribed) return renderMovieList();
  else if (!subscribed) {
  }
}

export default MainPage;
