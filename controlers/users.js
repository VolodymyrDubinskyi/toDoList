const jwt = require('jwt-simple');
const DB = require('../services/db');
const secret = require('./secret')
const config = require('../config/index')

const collection = config.DBCollections.users

module.exports = {
  checkUser: async (ctx) => {
    const userData = await DB.get(collection, { user: ctx.params.id })
    if (userData[0]) {
      ctx.body = JSON.stringify({ exist: true })
    } else {
      ctx.body = JSON.stringify({ exist: false })
    }
  },

  tokenLogin: async (ctx) => {
    if (ctx.state.user === null) {
      ctx.body = { ok: false }
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      ctx.body = { ok: true, user: ctx.state.user }
    }
  },

  update: async (ctx) => {
    if (ctx.state.user === null) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const { user, changes } = ctx.request.body
      const updated = await DB.update(user, changes, collection)
      ctx.body = JSON.stringify(updated)
    }
  },

  login: async (ctx) => {
    const { body } = ctx.request
    const userData = await DB.get(collection, {
      user: body.login.toLowerCase(),
      password: body.password.toLowerCase(),
    })
    if (userData.length !== 0) {
      const payload = { login: body.login };
      const token = jwt.encode(payload, secret.getSecret());
      ctx.body = { token, user: body.login }
    } else {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    }
  },

  create: async (ctx) => {
    const { body } = ctx.request
    ctx.body = body;
    const created = await DB.insert(body, collection)
    ctx.body = created;
  },
}
