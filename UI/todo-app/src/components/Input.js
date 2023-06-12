import React, { useState } from 'react';
import ViewTodos from './ViewTodos';
import { postTodo } from '../api';
import { RiAddFill } from 'react-icons/ri';
import './input.css'; // Import the CSS file for styling

const Input = () => {
  const [newTodo, setNewTodo] = useState({
    title: '',
    completed: 'No',
  });
  const [reloadTodo, setReloadTodo] = useState(false);

  const handleChange = (e) => {
    setNewTodo((v) => ({
      ...v,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit button is clicked.');

    try {
      const addedTask = newTodo;
      const response = await postTodo(addedTask);
      setReloadTodo(response.data.received);
      setNewTodo({
        title: '',
        completed: 'No',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const resetReloadTodo = (callback) => {
    setReloadTodo(callback);
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit} className="input-form">
        <label className="input-label"> Create: </label>
        <input name="title" onChange={handleChange} className="input-field" />
        <button type="submit" className="hidden-button" />
        <RiAddFill onClick={handleSubmit} className="add-icon" />
      </form>
      <ViewTodos reloadTodo={reloadTodo} resetReloadTodo={resetReloadTodo} />
    </div>
  );
};

export default Input;
