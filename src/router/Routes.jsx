import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import PaymentPage from "../pages/PaymentPage";
import ThankYouPage from "../pages/ThankYouPage";
import {action as AuthAction} from "../utilities/Auth";
const Routes =  [
  {
    path: "/",
    element: <MainPage />,
    loader: AuthAction,
 
  },
  {
    path: "/login",
    element: <LoginPage />,

     
   },
   {
    path: "/register",
    element: <RegistrationPage />,

     
   },
   {
    path: "/subscribe",
    element: <PaymentPage />,

     
   },
   {
    path: "/completed",
    element: <ThankYouPage />,

     
   },
]; 

export default Routes;