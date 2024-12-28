import React, { useState } from "react";
import { Client, Account, ID } from "appwrite";
import { Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Container,
  Alert,
} from "@mui/material";

const SignUpForm = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const client = new Client();
  client
    .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

  const account = new Account(client);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await account.create(ID.unique(), user.email, user.password);
      setUser({ name: "", email: "", password: "" });
      setSubmitted(true);
    } catch (error) {
      console.log("Error occurred:", error);
      setError(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            sx={{ marginBottom: "1rem", fontWeight: "bold", color: "#1976d2" }}
          >
            Sign Up
          </Typography>

          {submitted ? (
            <Alert severity="success" sx={{ marginBottom: "1rem" }}>
              Thank you for registering! You can now{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                log in here.
              </Link>
            </Alert>
          ) : (
            <>
              {error && (
                <Alert severity="error" sx={{ marginBottom: "1rem" }}>
                  {error}
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />

                {/* Email Input */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />

                {/* Password Input */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />

                {/* Sign-Up Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ marginTop: "1.5rem" }}
                >
                  Sign Up
                </Button>
              </form>
            </>
          )}

          {/* Redirect to Login */}
          {!submitted && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1.5rem",
                color: "#555",
              }}
            >
              <Typography variant="body2">
                Already have an account?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography
                    component="span"
                    sx={{
                      color: "#1976d2",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Log In
                  </Typography>
                </Link>
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignUpForm;
