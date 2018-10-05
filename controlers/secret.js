const jwt = require('jwt-simple');
const DB = require('../services/db');
const config = require('../config/index')
const User = require('../sequelize/user')

const secret = config.secret.key

module.exports = {
  getSecret: () => secret,
  checkToken: async (token) => {
    let decoded = ''
    decoded = jwt.decode(token, secret);

    decoded.login = decoded.login.toLowerCase()
    const user = await DB.get({
      name: decoded.login,
    }, User)
    return user
  },
}
