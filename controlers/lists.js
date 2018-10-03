const DB = require('../services/db');
const config = require('../config/index')
const List = require('../schems/list')
const User = require('../schems/user')

const collection = config.DBCollections.lists
const userCollection = config.DBCollections.users


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
      const listsId = userData[0].lists
      let lists = listsId.map(async (id) => {
        const list = await DB.get({
          '_id': id, //eslint-disable-line
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

    const userDb = await DB.get({ _id: user[0]['_id'] }, User) //eslint-disable-line

    const newUserBody = {
      title: 'no title',
      index: userDb[0].lists.length,
      lists: [],
    }

    ctx.body = body;
    if (user === undefined) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const created = await DB.insert(newUserBody, List)

      User.findById(user[0]['_id'], (err, newUser) => { //eslint-disable-line
        newUser.lists.push(created['_id']); //eslint-disable-line
        newUser.save();
      });

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
      const deleted = await DB.remove({ _id: id }, List)

      User.findById(user[0]['_id'], (err, newUser) => { //eslint-disable-line
        const index = newUser.lists.indexOf(deleted._id); //eslint-disable-line
        newUser.lists.splice(index, 1)
        newUser.save();
      });
      ctx.body = deleted;
    }
  },

  getUserList: async (ctx) => {
    let { id } = ctx.params
    id = id.toLowerCase()
    const userData = await DB.get(userCollection, { user: id })
    if (ctx.state.user === null) {
      ctx.body = JSON.stringify({ commit: 'Please login to see todolists' })
    } else if ((ctx.state.user !== id) && !userData[0].visibility) {
      ctx.body = JSON.stringify({ commit: `You have no rights to acess ${id} todolist` })
    } else {
      const todoData = await DB.get(`${collection}/${id}`, {})
      const listTitleAndData = {
        todoData,
        userData: userData[0],
        ownAcc: ctx.state.user === id,
      }
      ctx.body = JSON.stringify(listTitleAndData)
    }
  },

}
