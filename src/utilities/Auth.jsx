import axios from 'axios';
import { redirect } from "react-router-dom";

export const action = async ({request}) => {
  
    await fetch("http://127.0.0.1:8080/api/v1/subscription/getsecretkey", {
      method: "GET",
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return redirect('/login');      })
      .catch(error => {
        console.error("Error:", error.message);
      });

  
    return null;
}