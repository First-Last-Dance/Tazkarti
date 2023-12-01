import { createBrowserRouter } from "react-router-dom";
import BasePage from "../pages/BasePage/BasePage";
import Home from "../pages/Home/Home";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import MatchReserve from "../pages/MatchReserve/MatchReserve";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "login",
        element: <LogInPage />,
      },
      {
        path: "match-reserve",
        element: <MatchReserve />,
      },
    ],
  },

  {
    path: "*",
    element: <h1>Coming soon</h1>,
  },
]);

export default router;
