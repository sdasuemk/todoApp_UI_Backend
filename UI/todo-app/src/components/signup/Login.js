import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { login } from '../../api';

import StepToTheSunImage from './undraw_step_to_the_sun_nxqq.svg';

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(input);
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      navigate('/todo');
    } catch (err) {
      console.log('handleSubmitError', err);
    }
  };

  return (
    <div>
      <div className="login-container">
        <h1>Todo App</h1>
        <p>Sign in to manage your tasks and stay organized</p>
      </div>
      <div className="login-content">
        <div className="image-container">
          <img
            src={StepToTheSunImage}
            alt="Step to the Sun"
            className="image"
          />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="input-label">Username</label>
            <input
              type="text"
              name="userName"
              className="input-field"
              required
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
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
