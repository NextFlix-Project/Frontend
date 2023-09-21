import axios from "axios";
import { redirect } from "react-router-dom";

export const action = async ({ request, params }) => {
  try {
    const res = await axios.get(
      process.env.server_base + "/api/v1/auth/authenticated",
      {
        withCredentials: true,
      }
    );

    if (res.data !== "ADMIN") return redirect("/");
    if (res.status !== 200) return redirect("/login");

    return { auth: true, role: res.data };
  } catch (e) {
    return redirect("/login");
  }
  return null;
};
