const Todo = require('../schemas/models/Todo');

const editTodo = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).send('Todo not found');
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Failed to update todo:', error);
    res.status(500).send('Failed to update todo');
  } finally {
    next();
  }
};
module.exports = editTodo;
