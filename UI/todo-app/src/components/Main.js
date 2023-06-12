import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Common from './signup/Common';
import Input from './Input';
import Signup from './signup/Signup';
import Login from './signup/Login';

const Main = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Common />}></Route>
          <Route exact path="/user/signup" element={<Signup />}></Route>
          <Route exact path="/user/login" element={<Login />}></Route>
          <Route exact path="/todo" element={<Input />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
