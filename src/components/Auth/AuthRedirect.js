import React from "react";
import { Navigate } from "react-router-dom";

const AuthRedirect = (WrappedComponent, redirectPath) => {
  return (props) => {
    const token = localStorage.getItem("token"); // Retrieve token from storage

    if (token) {
      return <Navigate to={redirectPath} replace />; // The replace prop prevents adding to the history stack
    }

    return <WrappedComponent {...props} />;
  };
};

export default AuthRedirect;
