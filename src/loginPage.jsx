import React, { useState, useContext } from "react";
import { Client, Account } from "appwrite";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
    .setProject("674e187b000f402272bd"); // Your project ID

  const account = new Account(client);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await account.createSession(user.email, user.password);
      setIsAuthenticated(true);
      navigate("/dashboard"); // Redirect to the dashboard after login
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
