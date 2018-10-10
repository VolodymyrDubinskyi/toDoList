const DB = require('../services/db');
const Board = require('../sequelize/board')
const User = require('../sequelize/user')


module.exports = {
  list: async (ctx) => {
    const { user } = ctx.state
    if (!user[0].name) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const userData = await DB.get({
        name: ctx.state.user[0].name,
      }, User)
      const boardsId = JSON.parse(userData[0].boards)
      let boards = boardsId.map(async (id) => {
        const board = await DB.get({
          id,
        }, Board)
        return board
      })

      boards = await Promise.all(boards)
      boards = boards.map(board => board[0]);
      const boardTitleAndData = {
        boards,
        userData: userData[0],
      }
      ctx.body = JSON.stringify(boardTitleAndData)
    }
  },

  update: async (ctx) => {
    const { user } = ctx.state
    if (user === undefined) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const { id, changes } = ctx.request.body
      await DB.update(id, changes, Board)
      const updated = JSON.stringify({ id, changes })
      ctx.body = updated
    }
  },

  create: async (ctx) => {
    const { body } = ctx.request
    const userId = ctx.request.url.split('/')[2]
    const { user } = ctx.state
    const userDb = await DB.get({ id: userId }, User)

    const userboards = JSON.parse(userDb[0].boards)
    const newboardBody = {
      title: body.title,
      color: body.color,
      index: userboards.length,
      usersWithAccess: [userDb[0].name],
      private: body.private,
      admin: userDb[0].id,
      lists: [],
    }

    ctx.body = body;
    if (user === undefined) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const created = await DB.insert(newboardBody, Board)
      const getUser = await DB.get({ id: userId }, User)
      const boards = JSON.parse(getUser[0].boards)
      boards.push(created.id)
      await DB.update(userId, { boards }, User)
      ctx.body = created;
    }
  },

  remove: async (ctx) => {
    const { user } = ctx.state
    if (user === null) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const id = ctx.request.body.payload
      const deleted = await DB.remove({ id }, Board)

      User.findById(user[0].id, (err, newUser) => {
        const index = newUser.boards.indexOf(deleted.id)
        newUser.boards.splice(index, 1)
        newUser.save();
      });
      ctx.body = deleted;
    }
  },
}