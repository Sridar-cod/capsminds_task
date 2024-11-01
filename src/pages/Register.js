import React, { useEffect, useState } from "react";
import {
  StyledBox,
  StyledButton,
  StyledHeading,
  StyledInnerContainer,
  StyledInput,
  StyledLink,
  StyledOuterContainer,
  StyledErrorBox,
} from "../styles/login.styled";
import { register } from "../services/api";
import { storeUserData } from "../services/storage";
import { isAuthentication } from "../services/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formVal, setFormVal] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
  });
  const navigate = useNavigate();
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError({
      name: formVal.name.trim() === "",
      email: formVal.email.trim() === "" || !emailRegex.test(formVal.email),
      password: formVal.password.trim() === "" || formVal.password.length < 6,
    });
    if (
      formVal.name.trim() !== "" &&
      emailRegex.test(formVal.email) &&
      formVal.password.trim().length >= 6
    ) {
      setLoading(true);
      setApiError("");
      register(formVal)
        .then((res) => {
          storeUserData(res.data.idToken);
          if (isAuthentication()) {
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.error.message === "EMAIL_EXISTS") {
            setApiError(
              "Registration failed. Already this email has been registered."
            );
          }
        })
        .finally(() => {
          setLoading(false);
          setFormVal({ name: "", email: "", password: "" });
        });
    }
  };
  

  return (
    <StyledOuterContainer className="bg-gradient-to-r from-blue-500 to-green-500">
      <StyledInnerContainer>
        <StyledHeading className="text-green-500">Register</StyledHeading>
        <StyledBox>
          <form onSubmit={handleSubmit}>
            <StyledInput>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                name="name"
                value={formVal.name}
                onChange={handleInp}
              />
              {error.name && <p className="text-red-600">Enter a valid name</p>}
            </StyledInput>

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
                className="bg-green-600 hover:bg-green-700 transition-colors"
              >
                {loading ? "Registering..." : "Register"}
              </StyledButton>
            </div>
          </form>
        </StyledBox>
        {apiError && <StyledErrorBox>{apiError}</StyledErrorBox>}
        <StyledLink>
          <p>
            Already registered? <Link to="/">Login</Link>
          </p>
        </StyledLink>
      </StyledInnerContainer>
    </StyledOuterContainer>
  );
};

export default Register;
