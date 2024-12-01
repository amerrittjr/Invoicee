import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', user);
      console.log('User registered');
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Welcome to Invoicee</h2>
      <p>Please input sign in information</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;