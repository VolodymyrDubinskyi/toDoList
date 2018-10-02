const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  todos: Array,
  index: Number,
});

const List = mongoose.model('List', listSchema);

module.exports = List
