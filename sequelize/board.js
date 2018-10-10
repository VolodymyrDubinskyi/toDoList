const Sequelize = require('sequelize');

const sequelize = require('./init')

const Board = sequelize.define('listOfBoard', {
  title: {
    type: Sequelize.STRING,
  },
  index: {
    type: Sequelize.INTEGER,
  },
  color: {
    type: Sequelize.STRING,
  },
  private: {
    type: Sequelize.BOOLEAN,
  },
  admin: {
    type: Sequelize.INTEGER,
  },
  usersWithAccess: {
    type: Sequelize.STRING,
    get: function get() {
      return this.getDataValue('usersWithAccess');
    },
    set: function set(val) {
      return this.setDataValue('usersWithAccess', JSON.stringify(val));
    },
  },
  lists: {
    type: Sequelize.STRING,
    get: function get() {
      return this.getDataValue('lists');
    },
    set: function set(val) {
      return this.setDataValue('lists', JSON.stringify(val));
    },
  },
});

module.exports = Board
