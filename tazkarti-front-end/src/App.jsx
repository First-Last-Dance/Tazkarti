import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import useDocumentTitle from "./hooks/useDocumentTitle";
import { AuthProvider } from "./contexts/Authentication";

import "./App.css";
function App() {
  useDocumentTitle("sandiego dealership");
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
