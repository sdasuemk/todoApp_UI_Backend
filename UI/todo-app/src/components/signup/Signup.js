import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import { signup } from '../../api';

import PancakesImage from './undraw_pancakes_238t.svg';

const Signup = () => {
  const [input, setInput] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(input);
      setIsSubmitted(true);
    } catch (err) {
      console.log('handleSubmitError', err);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <h1>Todo App</h1>
        <p>Create an account to manage your tasks and stay organized</p>
      </header>
      <div className="signup-content">
        <div className="image-container">
          <img src={PancakesImage} alt="Pancakes" className="image" />
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="input-label">Name</label>
            <input
              type="text"
              name="name"
              className="input-field"
              required
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              className="input-field"
              required
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label className="input-label">Phone</label>
            <input
              type="tel"
              name="phone"
              className="input-field"
              required
              placeholder="Enter your phone number"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label className="input-label">Username</label>
            <input
              type="text"
              name="userName"
              className="input-field"
              required
              placeholder="Choose a username"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              className="input-field"
              required
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <div className="signup-footer">
        <p>
          Already have an account? <Link to="/user/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
