import React, { useEffect, useState } from "react";
import {
  StyledBox,
  StyledButton,
  StyledHeading,
  StyledInnerContainer,
  StyledInput,
  StyledOuterContainer,
  StyledLink,
  StyledErrorBox,
} from "../styles/login.styled";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { storeUserData } from "../services/storage";
import { isAuthentication } from "../services/auth";

const Login = () => {
  const [formVal, setFormVal] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  useEffect(() => {
    if (isAuthentication()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);
  const handleInp = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError({
      email: formVal.email.trim() === "" || !emailRegex.test(formVal.email),
      password: formVal.password.trim() === "" || formVal.password.length < 6,
    });
    if (emailRegex.test(formVal.email) && formVal.password.trim().length >= 6) {
      setLoading(true);
      setApiError("");
      login(formVal)
        .then((res) => {
          storeUserData(res.data.idToken);
          if (isAuthentication()) {
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setApiError("Invalid credentials, please try again.");
          } else {
            setApiError(
              "An unexpected error occurred. Please try again later."
            );
          }
        })
        .finally(() => {
          setLoading(false);
          setFormVal({ email: "", password: "" });
        });
    }
  };
  // if (isAuthentication()) {
  //   navigate('/dashboard')
  // }

  return (
    <StyledOuterContainer className="bg-gradient-to-r from-indigo-500 to-purple-600">
      <StyledInnerContainer>
        <StyledHeading className="text-purple-600">Login</StyledHeading>
        <StyledBox>
          <form onSubmit={handleSubmit}>
            <StyledInput>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                name="email"
                value={formVal.email}
                onChange={handleInp}
              />
              {error.email && (
                <p className="text-red-600">Enter a valid email</p>
              )}
            </StyledInput>

            <StyledInput>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password"
                value={formVal.password}
                onChange={handleInp}
              />
              {error.password && (
                <p className="text-red-600">
                  Password must be at least 6 characters
                </p>
              )}
            </StyledInput>

            <div className="mt-4">
              <StyledButton
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                {loading ? "Loging..." : "Login"}{" "}
              </StyledButton>
            </div>
          </form>
          {apiError && <StyledErrorBox>{apiError}</StyledErrorBox>}

          <StyledLink>
            <p>
              New here? <Link to="/register">Register</Link>
            </p>
          </StyledLink>
        </StyledBox>
      </StyledInnerContainer>
    </StyledOuterContainer>
  );
};

export default Login;
