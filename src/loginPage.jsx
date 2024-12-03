import React, { useState, useContext } from "react";
import { Client, Account } from "appwrite";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./authContext";

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

      console.log("session created:", response);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.log("error:", error);
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

      <div>
        <Link to="/signUp">
          <button>
            <h3>click here to go to sign-up page</h3>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
