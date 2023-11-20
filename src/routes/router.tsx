import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import User from "../components/view/User/User";
import Login from "../components/ui/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <User></User>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);
