import NavBar from "../components/navbar/NavBar";
import { useLoaderData, Outlet, useOutletContext } from "react-router-dom";

import "./AuthLayout.css";

const AuthLayout = () => {
  let data = useLoaderData();

  return (
    <div className="main-layout">
      <NavBar auth={{loggedIn: data.auth, role: data.role}}/>

      <Outlet context={data} />
    </div>
  );
};

export default AuthLayout;

export function useUser() {
  return useOutletContext();
}
