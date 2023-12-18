/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";

import useLocalStorage from "./useLocalStorage";

/* Creating a context object. */
const AuthContext = createContext(null);

/**
 * The AuthProvider is a function that takes in a child component and returns a context provider that
 * has a value of an object with the following properties: user, login, logout, getToken,
 * getExpirationDate, isLoggedIn, getFullName.
 * @returns The AuthContext.Provider is being returned.
 */
const AuthProvider = ({ children }) => {
  // Local storage for user information
  const [user, setUser] = useLocalStorage("tazkarit", "null");

  /**
   * The login function takes a user object as an argument, and then sets the user state to the
   * stringified version of the user object.
   * @param user - The user object that is returned from the login function.
   */
  const login = async (newUser) => {
    // Calculate token's expiration date
    // user.expiresIn = AddMinutes(new Date(), user.expiresIn / 60);
    setUser(JSON.stringify(newUser));
  };

  // Handle logout
  const logout = () => {
    localStorage.clear();
    console.log("Entering logout");
    setUser(undefined);
  };

  // Return user's username
  const getUserName = () => {
    if (user.username) {
      return JSON.parse(user).username;
    } else {
      return undefined;
    }
  };

  // Return user's token
  const getToken = () => {
    if (user.token) {
      return JSON.parse(user).token;
    } else {
      return undefined;
    }
  };

  // Return user's role
  const getRole = () => {
    if (user.role) {
      return JSON.parse(user).role;
    } else {
      return undefined;
    }
  };

  // Return token's expiration date
  const getExpirationDate = () => {
    return JSON.parse(user).expiresIn;
  };

  // Is user logged in?
  const isLoggedIn = () => {
    if (user !== "undefined") {
      console.log("Entered")
      return JSON.parse(user).token !== undefined;
    } else {
      return false;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        //user,
        login,
        logout,
        getToken,
        getUserName,
        getExpirationDate,
        isLoggedIn,
        getRole,
        //getFullName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
