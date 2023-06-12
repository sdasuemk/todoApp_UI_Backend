import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // the base URL used in Express backends
});

export const signup = (data) => api.post('/user/signup', data);
export const login = (data) => api.post('/user/login', data);
export const getUserTodo = () => {
  const storedToken = localStorage.getItem('token');
  console.log(storedToken);
  return api.get('/todo/usersTodo', {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
};
export const postTodo = (data) => {
  const storedToken = localStorage.getItem('token');
  console.log(storedToken);
  return api.post('/todo/add', data, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
};
export const delTodo = (id) => {
  const storedToken = localStorage.getItem('token');
  console.log(storedToken);
  return api.delete(`/todo/del/${id}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
};
export const editTodo = (id, data) => {
  const storedToken = localStorage.getItem('token');
  console.log(storedToken);
  return api.put(`/todo/edit/${id}`, data, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
};
