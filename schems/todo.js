const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  index: Number,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo
