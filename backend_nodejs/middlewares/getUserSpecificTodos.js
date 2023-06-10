const Todo = require('../schemas/models/Todo');

const getUserSpecificTodos = async (req, res, next) => {
  const userId = req.userId;
  try {
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (error) {
    console.error('Error retrieving todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    next();
  }
};
module.exports = getUserSpecificTodos;
