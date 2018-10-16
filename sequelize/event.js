const Sequelize = require('sequelize');

const sequelize = require('./init')

const Event = sequelize.define('events', {
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
});

module.exports = Event
