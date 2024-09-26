import React from "react";
import AuthForm from "../components/AuthForm";
import AuthRedirect from "../components/Auth/AuthRedirect";

function LoginPage() {
  return (
    <div className="login-page">
      {
        /* Pass isSignup prop to AuthForm component */
        <AuthForm isSignup={false} />
      }
    </div>
  );
}

export default AuthRedirect(LoginPage, "/home");
