/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "./Authentication";

/**
 * Used to protect routes that need user to login
 *
 * @param {React.Component} children Who need user to login
 * @returns {React.Component}
 */
const RequireManager = ({ children }) => {
  const auth = useAuth();

  console.log("Role:", auth.getRole());
  if (auth.getRole() === "fan") {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default RequireManager;
