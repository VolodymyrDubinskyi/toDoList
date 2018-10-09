const Sequelize = require('sequelize');

const sequelize = require('./init')

const Board = sequelize.define('newBoardList', {
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
  usersWithaccess: {
    type: Sequelize.STRING,
    get: function get() {
      return this.getDataValue('usersWithaccess');
    },
    set: function set(val) {
      return this.setDataValue('usersWithaccess', JSON.stringify(val));
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
