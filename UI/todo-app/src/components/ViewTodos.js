import React from "react";

const ViewTodos = ({ formData, modTodos }) => {
  /*  const formData = [
    {
      addTodo: "task-1",
      status: "notDone",
      id: 012
    },
    {
      addTodo: "task-2",
      status: "notDone",
      id: 002
    }
  ]; */
  const handleDelete = (e) => {
    const id = e.target.id;
    modTodos(id);
  };

  return (
    <div>
      <h1>Todos</h1>
      {formData.map((item, index) => (
        <h3 key={index}>
          {item.addTodo}
          <button
            id={item.addTodo}
            onClick={handleDelete}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </h3>
      ))}
    </div>
  );
};
export default ViewTodos;
