const DB = require('../services/db');
const List = require('../sequelize/list')
const Board = require('../sequelize/board')


module.exports = {
  list: async (ctx) => {
    const { user } = ctx.state
    const boardId = ctx.url.split('/')[2]
    if (!user[0].name) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const userData = await DB.get({
        id: boardId,
      }, Board)
      const listsId = JSON.parse(userData[0].lists)
      let lists = listsId.map(async (id) => {
        const list = await DB.get({
          id,
        }, List)
        return list
      })

      lists = await Promise.all(lists)
      const listTitleAndData = {
        lists,
        userData: userData[0],
      }
      ctx.body = JSON.stringify(listTitleAndData)
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

      await DB.update(id, changes, List)
      const updated = JSON.stringify({ id, changes })
      ctx.body = updated
    }
  },

  create: async (ctx) => {
    const { id } = ctx.request.body
    const { body } = ctx.request
    const { user } = ctx.state

    const boardDb = await DB.get({ id }, Board)

    const boardLists = JSON.parse(boardDb[0].lists)
    const newListBody = {
      title: 'no title',
      index: boardLists.length,
      todos: [],
    }

    ctx.body = body;
    if (user === undefined) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const created = await DB.insert(newListBody, List)

      const getBoard = await DB.get({ id }, Board)
      const lists = JSON.parse(getBoard[0].lists)
      lists.push(created.id)

      await DB.update(getBoard[0].id, { lists }, Board)
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
      const deleted = await DB.remove({ id }, List)

      Board.findById(user[0].id, (err, newUser) => {
        const index = newUser.lists.indexOf(deleted.id)
        newUser.lists.splice(index, 1)
        newUser.save();
      });
      ctx.body = deleted;
    }
  },
}
