import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
          }}
        >
          Invoicee
        </Typography>

        {/* Desktop Links */}
        <div className="navbar-links" style={{ display: "flex", gap: "15px" }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/login"
            color="inherit"
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            color="inherit"
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            color="inherit"
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/invoiceForm"
            color="inherit"
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          >
            Invoice Builder
          </Button>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer for Mobile Navigation */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <div
          style={{
            width: "250px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={toggleDrawer}
            sx={{ alignSelf: "flex-end", margin: 1 }}
          >
            <CloseIcon />
          </IconButton>

          {/* Drawer Links */}
          <List>
            {[
              { label: "Home", path: "/" },
              { label: "Login", path: "/login" },
              { label: "Sign Up", path: "/signup" },
              { label: "Dashboard", path: "/dashboard" },
              { label: "Invoice Builder", path: "/invoiceForm" },
            ].map((item, index) => (
              <ListItem
                button
                key={index}
                component={Link}
                to={item.path}
                onClick={toggleDrawer}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
