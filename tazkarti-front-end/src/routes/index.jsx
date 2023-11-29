import { createBrowserRouter } from "react-router-dom";
import BasePage from "../pages/BasePage/BasePage";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },

  {
    path: "*",
    element: <h1>Coming soon</h1>,
  },
]);

export default router;
