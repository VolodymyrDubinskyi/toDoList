const Sequelize = require('sequelize');

const sequelize = require('./init')

const Event = sequelize.define('ListOfTheEvents', {
  userId: {
    type: Sequelize.STRING,
  },
  event: {
    type: Sequelize.STRING,
  },
  payload: {
    type: Sequelize.STRING,
  },
  boardId: {
    type: Sequelize.STRING,
  },
  userName: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.STRING,
  },
});

module.exports = Event
