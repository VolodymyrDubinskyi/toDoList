const Sequelize = require('sequelize');

const sequelize = require('./init')


const List = sequelize.define('lists', {
  title: {
    type: Sequelize.STRING,
  },
  index: {
    type: Sequelize.INTEGER,
  },
  todos: {
    type: Sequelize.STRING,
    get: function get() {
      return this.getDataValue('todos');
    },
    set: function set(val) {
      return this.setDataValue('todos', JSON.stringify(val));
    },
  },
});

module.exports = List
