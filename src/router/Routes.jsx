import AuthLayout from "../layouts/AuthLayout";
import MainPage from "../pages/mainpage/MainPage";
import LoginPage from "../pages/login/LoginPage";
import RegistrationPage from "../pages/registration/RegistrationPage";
import PaymentPage from "../pages/payment/PaymentPage";
import ThankYouPage from "../pages/thankyou/ThankYouPage";
import VideoPage from "../pages/videopage/VideoPage";
import { action as AuthLoader } from "../utilities/loaders/Auth";
import { action as AdminLoader } from "../utilities/loaders/Admin";
import PublicLayout from "../layouts/PublicLayout";
import DashboardPage from "../pages/admin/DashboardPage";

const Routes = [
  {
    path: "/",
    element: <AuthLayout />,
    loader: AuthLoader,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/video",
        element: <VideoPage />,
      },
      {
        path: "/subscribe",
        element: <PaymentPage />,
      },
      {
        path: "/completed",
        element: <ThankYouPage />,
      },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,

    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    loader: AdminLoader,

    children: [
      {
        path: "/admin",
        element: <DashboardPage />,
      },
    ],
  },
];

export default Routes;
