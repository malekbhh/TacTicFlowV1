import { createBrowserRouter, useNavigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import User from "./views/User";
import Home from "./views/Home.jsx";
import GoogleCallback from "./components/GoogleCallback.jsx";
import { Navigate } from "react-router-dom";
import ResetPassword from "./views/ResetPassword.jsx";
import NewPassword from "./views/NewPassword.jsx";
import Projects from "./components/Projects.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/user" />,
      },

      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/passwordreset",
        element: <ResetPassword />,
      },
      {
        path: "/newpassword",
        element: <NewPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
