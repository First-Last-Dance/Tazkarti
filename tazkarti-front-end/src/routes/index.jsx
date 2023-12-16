import { createBrowserRouter } from "react-router-dom";
import BasePage from "../pages/BasePage/BasePage";
import Home from "../pages/Home/Home";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import MatchReserve from "../pages/MatchReserve/MatchReserve";
import AllMatches from "../pages/AllMatches/AllMatches";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

import RequireAuth from "../contexts/RequireAuth";
import Admin from "../pages/Admin/Admin";



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
        path: "buy-ticket/:id",
        element: (
          <RequireAuth>
            <MatchReserve />
          </RequireAuth>
        ),
      },
      {
        path: "matches",
        element: <AllMatches />,
      },
      {
        path: "profile",
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "dashboard",
        element: (
          <RequireAuth>
            <Admin />
          </RequireAuth>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <h1>Coming soon</h1>,
  },
]);

export default router;
