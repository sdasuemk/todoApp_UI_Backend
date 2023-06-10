const Todo = require('../schemas/models/Todo');

const allTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find() // all Todos then
      .populate('user', 'name userName -_id'); // chane to populate for logged in users, only name & username
    res.status(200).json(todos);
    console.log('Todos are available');
  } catch (error) {
    console.error('Failed to get todos:', error);
    res.status(500).send('Failed to get todos');
  } finally {
    next();
  }
};
module.exports = allTodos;
