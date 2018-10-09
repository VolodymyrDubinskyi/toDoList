const Sequelize = require('sequelize');

const sequelize = require('./init')

const User = sequelize.define('usersWithBoards', {
  name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  boards: {
    type: Sequelize.STRING,
    get: function get() {
      return JSON.parse(this.getDataValue('boards'));
    },
    set: function set(val) {
      return this.setDataValue('boards', JSON.stringify(val));
    },
  },
});

module.exports = User
