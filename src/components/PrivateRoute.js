import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Route, Redirect } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ component: Component }, ...rest) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
