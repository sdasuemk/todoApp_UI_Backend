import React, { useEffect, useState } from 'react';
import { getUserTodo, delTodo, editTodo } from '../api';
import {
  FiTrash2,
  FiEdit,
  FiPlayCircle,
  FiCheckCircle,
  FiSave,
  FiX, // Add FiX icon for canceling edit
} from 'react-icons/fi';
import './todoView.css';

const ViewTodos = ({ reloadTodo, resetReloadTodo }) => {
  const [todos, setTodos] = useState([]);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemTitle, setEditingItemTitle] = useState('');

  const handleDelete = async (id) => {
    try {
      await delTodo(id);
      setRefreshStatus(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    setEditingItemId(id);
    const itemToEdit = todos.find((item) => item._id === id);
    if (itemToEdit) {
      setEditingItemTitle(itemToEdit.title);
    }
  };

  const handleSaveEdit = async (id) => {
    const data = {
      title: editingItemTitle,
    };
    try {
      await editTodo(id, data);
      setEditingItemId(null);
      setEditingItemTitle('');
      setRefreshStatus(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProgress = async (id) => {
    const data = {
      completed: 'Progress',
    };
    try {
      await editTodo(id, data);
      setRefreshStatus(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (id) => {
    const data = {
      completed: 'Yes',
    };
    try {
      await editTodo(id, data);
      setRefreshStatus(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getTodos = async () => {
    try {
      const tasks = await getUserTodo();
      setTodos(tasks.data);
      resetReloadTodo(false);
      setRefreshStatus(false);
    } catch (err) {
      console.error('Todos error', err);
    }
  };

  useEffect(() => {
    getTodos();
  }, [reloadTodo, refreshStatus]);

  const filterTodosByStatus = (status) => {
    return todos.filter((item) => item.completed === status);
  };

  return (
    <div>
      <h1>Todos</h1>
      <div className="todos-container">
        <div className="todos-column">
          <h2>Todo</h2>
          {filterTodosByStatus('No').map((item, index) => (
            <div key={index} className="todo-item">
              {item._id === editingItemId ? (
                <>
                  <input
                    type="text"
                    value={editingItemTitle}
                    onChange={(e) => setEditingItemTitle(e.target.value)}
                    style={{
                      padding: '5px',
                      borderRadius: '5px',
                      border: '1px solid gray',
                    }}
                  />
                  <FiSave
                    onClick={() => handleSaveEdit(item._id)}
                    className="action-icon primary-color"
                  />
                  <FiX
                    onClick={() => setEditingItemId(null)}
                    className="action-icon cancel-color"
                  />{' '}
                  {/* Add the cancel icon */}
                </>
              ) : (
                <div className="item-content">
                  <span>{item.title}</span>
                  <div className="action-icons">
                    <FiTrash2
                      onClick={() => handleDelete(item._id)}
                      className="action-icon danger-color"
                    />
                    <FiEdit
                      onClick={() => handleEdit(item._id)}
                      className="action-icon primary-color"
                    />
                    <FiPlayCircle
                      onClick={() => handleProgress(item._id)}
                      className="action-icon success-color"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="todos-column">
          <h2>In Progress</h2>
          {filterTodosByStatus('Progress').map((item, index) => (
            <div key={index} className="todo-item">
              {item._id === editingItemId ? (
                <>
                  <input
                    type="text"
                    value={editingItemTitle}
                    onChange={(e) => setEditingItemTitle(e.target.value)}
                    style={{
                      padding: '5px',
                      borderRadius: '5px',
                      border: '1px solid gray',
                    }}
                  />
                  <FiSave
                    onClick={() => handleSaveEdit(item._id)}
                    className="action-icon primary-color"
                  />
                  <FiX
                    onClick={() => setEditingItemId(null)}
                    className="action-icon cancel-color"
                  />{' '}
                  {/* Add the cancel icon */}
                </>
              ) : (
                <div className="item-content">
                  <span>{item.title}</span>
                  <div className="action-icons">
                    <FiTrash2
                      onClick={() => handleDelete(item._id)}
                      className="action-icon danger-color"
                    />
                    <FiEdit
                      onClick={() => handleEdit(item._id)}
                      className="action-icon primary-color"
                    />
                    <FiCheckCircle
                      onClick={() => handleComplete(item._id)}
                      className="action-icon success-color"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="todos-column">
          <h2>Completed</h2>
          {filterTodosByStatus('Yes').map((item, index) => (
            <div key={index} className="todo-item">
              <div className="item-content">
                <span>{item.title}</span>
                <div className="action-icons">
                  <FiTrash2
                    onClick={() => handleDelete(item._id)}
                    className="action-icon danger-color"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTodos;
