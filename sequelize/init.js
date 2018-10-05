const Sequelize = require('sequelize');

const config = require('../config/index')

const newConfig = config.sequelize;
const sequelize = new Sequelize(
  newConfig.database,
  newConfig.username,
  newConfig.password,
  newConfig,
);
module.exports = sequelize
