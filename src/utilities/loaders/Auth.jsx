import axios from "axios";
import { redirect } from "react-router-dom";

export const action = async ({ request, params }) => {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8080/api/v1/auth/authenticated",
      {
        withCredentials: true,
      }
    );

    if (res.status !== 200) redirect("/login");

    return { auth: true, role: res.data };
  } catch (e) {
    return redirect("/login");
  }
  return null;
};
