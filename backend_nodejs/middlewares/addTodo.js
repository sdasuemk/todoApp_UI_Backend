const Todo = require('../schemas/models/Todo');
const User = require('../schemas/models/User');

const addTodo = async (req, res, next) => {
  // get user id from authGuard decoded token
  // as authGuard function is passed earlier than addTodo function
  const userId = req.userId;
  try {
    const todo = new Todo({
      // destructures
      ...req.body, // user input
      user: userId, // use that user id from authGuard decoded token
    });
    const newTodo = await todo.save();
    const newTodoWithUserId = await User.updateOne(
      {
        _id: userId, // which have created by user id
      },
      {
        $push: {
          todos: newTodo._id,
        },
      }
    );

    res.status(201).json({ newTodoWithUserId, newTodo });
    console.log('Todo saved successfully');
  } catch (error) {
    console.error('Failed to create todo:', error);
    res.status(500).send('Failed to create todo');
  } finally {
    next();
  }
};
module.exports = addTodo;
