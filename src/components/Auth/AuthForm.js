import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FormContainer,
  FormWrapper,
  Title,
  Input,
  Button,
  LinkText,
  Link,
} from "../../styles/components/AuthForm";

const AuthForm = ({ isSignup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Redirect to home if the user is already authenticated
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/home");
  //   }
  // }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? "https://healthfizz-backend.onrender.com/auth/register"
      : "https://healthfizz-backend.onrender.com/auth/login";

    try {
      const response = await axios.post(url, formData);
      // console.log(response.data);
      localStorage.setItem("token", response.data);
      localStorage.setItem("email", formData.email);
      alert(`${isSignup ? "Sign up" : "Login"} successful`);

      // navigate("/home");
      window.location.reload(false);
    } catch (err) {
      setError(err.response?.data.message || "Something went wrong");
    }
  };

  const handleToggle = () => {
    navigate(isSignup ? "/login" : "/register");
  };

  return (
    <FormContainer>
      <FormWrapper>
        <Title>{isSignup ? "Sign Up" : "Login"}</Title>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          )}
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <Button type="submit">{isSignup ? "Sign Up" : "Login"}</Button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <LinkText>
          {isSignup ? "Already have an account? " : "Don’t have an account? "}
          <Link onClick={handleToggle}>{isSignup ? "Login" : "Sign Up"}</Link>
        </LinkText>
      </FormWrapper>
    </FormContainer>
  );
};

export default AuthForm;
