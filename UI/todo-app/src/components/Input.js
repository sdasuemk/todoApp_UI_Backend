import React, { useState } from "react";
import ViewTodos from "./ViewTodos";

const Input = () => {
  const [formData, setFormData] = useState([]);
  const [newTodo, setNewTodo] = useState({
    addTodo: "",
    status: "notDone"
  });

  const handleChange = (e) => {
    setNewTodo((v) => ({
      ...v,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit button is clicked.");
    setFormData((v) => [...v, newTodo]);
  };
  const modTodos = (callback) => {
    console.log("callback", typeof callback);
    const afterDelete = formData.filter((item) => item.addTodo !== callback);
    setFormData(afterDelete);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Add new todo: </label>
        <input name="addTodo" onChange={handleChange} />
        <button type="submit" style={{ marginLeft: "10px" }}>
          {" "}
          add{" "}
        </button>
      </form>
      <ViewTodos formData={formData} modTodos={modTodos} />
    </div>
  );
};
export default Input;
