import React from "react";
import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const token = localStorage.getItem("token"); // Retrieve token from storage

    if (!token) {
      return <Navigate to="/register" replace />; // Redirect to login if not authenticated
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
