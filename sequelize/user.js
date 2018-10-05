const Sequelize = require('sequelize');

const sequelize = require('./init')

const User = sequelize.define('usersTable', {
  name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  lists: {
    type: Sequelize.STRING,
    get: function get() {
      return JSON.parse(this.getDataValue('lists'));
    },
    set: function set(val) {
      return this.setDataValue('lists', JSON.stringify(val));
    },
  },
});

module.exports = User
