import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    pendingTasks: 0,
    upcomingDeadlines: 0,
    totalInvoices: 0,
  });

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
      } catch (error) {
        console.log("Error fetching user details:", error);
        navigate("/login");
      }
    };

    const fetchStats = () => {
      // Mock data; replace with API calls to fetch real stats
      setStats({
        pendingTasks: 5, // Replace with API call to fetch task count
        upcomingDeadlines: 3, // Replace with API call for upcoming deadlines
        totalInvoices: 12, // Replace with API call for invoice count
      });
    };

    fetchUser();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await account.deleteSession("current");
      console.log("User signed out");
      <p>logging out</p>;
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
    <div className="dashboard">
      <h2 className="dashboard-intro">
        {getTimeGreeting()}, {user ? user.name : "loading..."}!
      </h2>

      {/* Quick Stats Section */}
      <div className="quick-stats">
        <div className="stat-item">
          <h3>Pending Tasks</h3>
          <p>{stats.pendingTasks}</p>
        </div>
        <div className="stat-item">
          <h3>Upcoming Deadlines</h3>
          <p>{stats.upcomingDeadlines}</p>
        </div>
        <div className="stat-item">
          <h3>Total Invoices</h3>
          <p>{stats.totalInvoices}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="dashboard-links">
        <Link to="/invoiceDash">
          <h3>Invoices</h3>
        </Link>
        <Link to="/calendar">
          <h3>Calendar</h3>
        </Link>
        <Link to="/plannerDash">
          <h3>Planner</h3>
        </Link>
        <Link to="/tasks">
          <h3>Tasks</h3>
        </Link>
        <Link to="/profile">
          <h3>Profile</h3>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>Updated task: "Finish Dashboard Feature"</li>
          <li>Created a new invoice: #12345</li>
          <li>Scheduled event: "Team Meeting on Dec 10th"</li>
        </ul>
      </div>

      {/* Dark Mode Toggle */}
      <div className="settings">
        <label>
          <input type="checkbox" />
          Dark Mode
        </label>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        style={{
          padding: "10px 20px",
          fontSize: "14px",
          color: "#fff",
          backgroundColor: "red",
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
