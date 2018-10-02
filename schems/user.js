const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  password: String,
  lists: Array,
});

const User = mongoose.model('User', userSchema);

module.exports = User
