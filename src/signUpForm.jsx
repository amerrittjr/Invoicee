import React, { useState } from "react";
import { Client, Account, Databases, ID } from "appwrite";

const SignUpForm = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
    .setProject("674e187b000f402272bd"); // Your project ID

  const account = new Account(client);
  const databases = new Databases(client);

  function nameValidator(name) {
    if (!name) {
      return "Name is required";
    }
    if (name.length < 2) {
      return "Name too short";
    }
    return "";
  }

  function emailValidator(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Please enter email to continue";
    }
    if (!emailRegex.test(email)) {
      return "Email is not valid";
    }
    return "";
  }

  function passwordValidator(password) {
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (!password) {
      return "Please enter password";
    }
    if (!passwordRegex.test(password)) {
      return "Password must contain one letter and one number";
    }
    return "";
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Validate the field and update the corresponding error state
    if (name === "name") {
      setNameError(nameValidator(value));
    } else if (name === "email") {
      setEmailError(emailValidator(value));
    } else if (name === "password") {
      setPasswordError(passwordValidator(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const nameError = nameValidator(user.name);
    const emailError = emailValidator(user.email);
    const passwordError = passwordValidator(user.password);

    if (nameError || emailError || passwordError) {
      setNameError(nameError);
      setEmailError(emailError);
      setPasswordError(passwordError);
      return;
    }

    try {
      // Create user in Appwrite authentication system
      const userResponse = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );
      console.log("User registered");

      // Store user information in a custom database collection
      const documentResponse = await databases.createDocument(
        "674e1b500036e1b11a58", // Your database ID
        "674e1db7002157b274f8", // Your collection ID
        ID.unique(), // Unique document ID
        {
          userId: userResponse.$id,
          name: user.name,
          email: user.email,
        }
      );
      console.log("User information stored in database", documentResponse);

      // Reset form fields
      setUser({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        {nameError && <p className="error">{nameError}</p>}
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {emailError && <p className="error">{emailError}</p>}
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
