const jwt = require('jwt-simple');

const DB = require('../services/db')
const secret = require('./secret')
const User = require('../sequelize/user')


module.exports = {
  checkUser: async (ctx) => {
    const userName = ctx.req.url.split('/')[2]
    await DB.get({
      name: userName,
    }, User).then((user) => {
      if (user[0]) {
        ctx.body = JSON.stringify({ exist: true })
      } else {
        ctx.body = JSON.stringify({ exist: false })
      }
    })
  },

  tokenLogin: async (ctx) => {
    if (!ctx.state.user) {
      ctx.body = { ok: false }
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      await DB.get({
        name: ctx.state.user[0].name,
      }, User)
        .then(user => user[0])
        .then((user) => {
          ctx.body = {
            info: {
              id: user.id,
              user: user.name,
              boards: JSON.parse(user.boards),
            },
          }
        })
    }
  },

  login: async (ctx) => {
    const { body } = ctx.request
    const query = {
      name: body.login.toLowerCase(),
      password: body.password.toLowerCase(),
    }

    await DB.get(query, User)
      .then(user => user[0])
      .then((user) => {
        if (user !== null) {
          const payload = { login: body.login };
          const token = jwt.encode(payload, secret.getSecret());
          ctx.body = {
            token,
            info: {
              id: user.id,
              user: user.name,
              boards: JSON.parse(user.boards),
            },
          }
        } else {
          ctx.body = JSON.stringify({})
          ctx.status = 401;
          ctx.throw(401, 'Unauthorized');
        }
      })
  },

  update: async (ctx) => {
    if (ctx.state.user === null) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const { changes, id } = ctx.request.body
      await DB.update(id, { changes }, User)
      ctx.body = JSON.stringify(changes)
    }
  },

  create: async (ctx) => {
    const { body } = ctx.request
    body.password = body.password.toLowerCase()
    body.user = body.user.toLowerCase()

    const newUserBody = {
      name: body.user,
      password: body.password,
      boards: [],
    }
    await DB.insert(newUserBody, User)
    ctx.body = body;
  },
}
