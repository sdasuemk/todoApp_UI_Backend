import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';
import './common.css';

const Common = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to the desired route or perform any other action
    navigate('/user/signup');
  };

  return (
    <div className="container">
      <h1>Welcome to the Todo App</h1>
      <p>Stay organized and manage your tasks effectively.</p>
      <button className="cta-button" onClick={handleGetStarted}>
        <MdArrowForward className="button-icon" /> Get Started
      </button>
    </div>
  );
};

export default Common;
