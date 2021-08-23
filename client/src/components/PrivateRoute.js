import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Navbar from "./Navbar";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, userType } = useAuth();

  // localStorage.setItem("logged_in_user", JSON.stringify(currentUser));

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <>
            <Navbar userType={userType} />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/home" />
        );
      }}
    ></Route>
  );
}
