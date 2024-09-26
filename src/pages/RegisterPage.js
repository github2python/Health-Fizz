import React from "react";
import AuthForm from "../components/AuthForm";
import AuthRedirect from "../components/Auth/AuthRedirect";

function RegisterPage() {
  return <div className="register-page">{<AuthForm isSignup={true} />}</div>;
}

export default AuthRedirect(RegisterPage, "/home");
