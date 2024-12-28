import React from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          sx={{ fontWeight: "bold", color: "#1976d2", marginBottom: "1rem" }}
        >
          Welcome to Invoicee
        </Typography>
        <Typography
          variant="h5"
          component="h4"
          sx={{ marginBottom: "2rem", color: "#555" }}
        >
          Simplify your invoicing process with an all-in-one platform designed
          for businesses of all sizes.
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginRight: "1rem" }}
            href="/signup"
          >
            Get Started
          </Button>
          <Button variant="outlined" color="primary" size="large" href="/login">
            Log In
          </Button>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ marginTop: "4rem" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                padding: "1.5rem",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                Create Invoices Quickly
              </Typography>
              <Typography sx={{ color: "#777" }}>
                Generate professional invoices in seconds with our intuitive
                builder.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                padding: "1.5rem",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                Track Payments
              </Typography>
              <Typography sx={{ color: "#777" }}>
                Keep track of all your invoices and payments in one place.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                padding: "1.5rem",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                Collaborate Seamlessly
              </Typography>
              <Typography sx={{ color: "#777" }}>
                Share invoices and collaborate with your team effortlessly.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer Section */}
      <Box
        sx={{
          marginTop: "4rem",
          padding: "1rem 0",
          width: "100%",
          textAlign: "center",
          backgroundColor: "#1976d2",
          color: "#fff",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Invoicee. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
