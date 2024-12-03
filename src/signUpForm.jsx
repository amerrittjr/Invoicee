import React, { useState } from "react";
import { Client, Account, Databases, ID } from "appwrite";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const client = new Client();
  client
    .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

  const account = new Account(client);
  const databases = new Databases(client);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    account.create(ID.unique(), user.email, user.password).then(
      function (response) {
        console.log(response);
        setUser({ name: "", email: "", password: "" });
        setSubmitted(true);
      },
      function (error) {
        console.log("error occurred:", error);
      }
    );
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      {submitted ? (
        <p>Thank you for registering!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={user.name}
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      )}

      <div>
        <Link to="/login">
          <button>
            <h3>click here to go to login page</h3>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
