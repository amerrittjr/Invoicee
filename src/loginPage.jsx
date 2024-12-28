import React, { useState, useContext } from "react";
import { Client, Account } from "appwrite";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./authContext";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Container,
} from "@mui/material";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

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

    try {
      const response = await account.createEmailPasswordSession(
        user.email,
        user.password
      );

      console.log("Session created:", response);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
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
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
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

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ marginTop: "1.5rem" }}
            >
              Login
            </Button>
          </form>

          {/* Redirect to Sign-Up */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1.5rem",
              color: "#555",
            }}
          >
            <Typography variant="body2">
              Don’t have an account?{" "}
              <Link to="/signUp" style={{ textDecoration: "none" }}>
                <Typography
                  component="span"
                  sx={{
                    color: "#1976d2",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Typography>
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
