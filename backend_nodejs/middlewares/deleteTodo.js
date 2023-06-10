const Todo = require('../schemas/models/Todo');

const deleteTodo = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).send('Todo not found');
    }

    res.status(200).json(deletedTodo);
    console.log('Todo deleted successfully');
  } catch (error) {
    console.error('Failed to delete todo:', error);
    res.status(500).send('Failed to delete todo');
  } finally {
    next();
  }
};
module.exports = deleteTodo;
