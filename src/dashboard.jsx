import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";
import { getRecentActivities, getTotalInvoices } from "./api";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Switch,
  Box,
  Divider,
} from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    upcomingDeadlines: 0,
    totalInvoices: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);

  const client = new Client();
  client
    .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

  const account = new Account(client);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await account.get();
        setUser(userDetails);
        fetchStats();
        fetchActivities();
      } catch (error) {
        console.log("Error fetching user details:", error);
        navigate("/login");
      }
    };

    const fetchStats = async () => {
      try {
        // Fetch total invoices and other stats here
        const totalInvoices = await getTotalInvoices(user.id);
        setStats((prevStats) => ({
          ...prevStats,
          totalInvoices,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchActivities = async () => {
      try {
        const activities = await getRecentActivities();
        setRecentActivities(activities);
      } catch (error) {
        console.log("Error fetching recent activities:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await account.deleteSession("current");
      console.log("User signed out");
      navigate("/login");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ marginTop: 4 }}>
        {/* Greeting Section */}
        <Typography variant="h4" gutterBottom>
          {getTimeGreeting()}, {user ? user.name : "loading..."}!
        </Typography>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {[
            { label: "Upcoming Deadlines", value: stats.upcomingDeadlines },
            { label: "Total Invoices", value: stats.totalInvoices },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Navigation Links */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Quick Links
          </Typography>
          <Divider />
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {[
              { label: "Invoices", link: "/invoiceDash" },
              { label: "Calendar", link: "/calendar" },
              { label: "Planner", link: "/plannerDash" },
            ].map((item, index) => (
              <Grid item key={index}>
                <Button
                  component={Link}
                  to={item.link}
                  variant="contained"
                  color="primary"
                >
                  {item.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Recent Activity Section */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Recent Activity
          </Typography>
          <Divider />
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {recentActivities.map((activity, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">
                      {activity.invoiceData.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Dark Mode Toggle */}
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Typography variant="body1">Dark Mode</Typography>
          <Switch />
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
