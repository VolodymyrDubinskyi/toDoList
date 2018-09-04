const jwt = require('jwt-simple');
const DB = require('../services/db');
const config = require('../config/index')

const userCollection = config.DBCollections.users
const secret = config.secret.key

module.exports = {
  getSecret: () => secret,
  checkToken: async (token) => {
    let decoded = ''
    decoded = jwt.decode(token, secret);

    decoded.login = decoded.login.toLowerCase()
    const getUser = await DB.get(userCollection, { user: decoded.login })

    if (getUser[0]) {
      return getUser[0].user
    }
    return null
  },
}
