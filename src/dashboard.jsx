import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Client, Account } from "appwrite";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const client = new Client();

  client
    .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

  const account = new Account(client);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let userDetails = await account.get();
        setUser(userDetails);
      } catch (error) {
        console.log("error fetching user details");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await account.deleteSession("current");
      console.log("user signed out");
      navigate("/login");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome to your Dashboard, {user ? user.name : "loading..."} </h2>
      <p>This is a generic dashboard page.</p>
      <Link to="/invoiceBuilder">
        <button
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create a new Invoice
        </button>
      </Link>
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
        sign out
      </button>
    </div>
  );
};

export default Dashboard;
