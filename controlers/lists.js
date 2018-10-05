const DB = require('../services/db');
const List = require('../sequelize/list')
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
    const { body } = ctx.request
    const { user } = ctx.state

    const userDb = await DB.get({ id: user[0].id }, User)

    const userLists = JSON.parse(userDb[0].lists)
    const newListBody = {
      title: 'no title',
      index: userLists.length,
      todos: [],
    }

    ctx.body = body;
    if (user === undefined) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const created = await DB.insert(newListBody, List)

      const getUser = await DB.get({ id: user[0].id }, User)
      const lists = JSON.parse(getUser[0].lists)
      lists.push(created.id)

      await DB.update(getUser[0].id, { lists }, User)
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

      User.findById(user[0].id, (err, newUser) => {
        const index = newUser.lists.indexOf(deleted.id)
        newUser.lists.splice(index, 1)
        newUser.save();
      });
      ctx.body = deleted;
    }
  },
}
