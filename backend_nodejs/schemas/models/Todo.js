//external import
const mongoose = require('mongoose');

// schema instance

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  date: {
    type: String,
    default: Date.now(),
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

// model

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
