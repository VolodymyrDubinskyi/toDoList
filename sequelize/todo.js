const Sequelize = require('sequelize');

const sequelize = require('./init')

const Todo = sequelize.define('todos', {
  title: {
    type: Sequelize.STRING,
  },
  index: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Todo
