const jwt = require('jwt-simple');
const DB = require('./db');

const secret = 'toDoSecretKey'

module.exports = {
  getSecret: () => secret,
  checkToken: async (token) => {
    let decoded = ''
    decoded = jwt.decode(token, secret);

    decoded.login = decoded.login.toLowerCase()
    const getUser = await DB.get('user', { user: decoded.login })

    if (getUser[0]) {
      return getUser[0].user
    }
    return null
  },
}
