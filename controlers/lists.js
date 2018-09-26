const { ObjectId } = require('mongodb');
const DB = require('../services/db');
const config = require('../config/index')

const collection = config.DBCollections.lists
const userCollection = config.DBCollections.users

module.exports = {
  list: async (ctx) => {
    const { user } = ctx.state
    if (user === 'null') {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const userData = await DB.get(userCollection, { user })
      const lists = await DB.get(`${collection}/${user}`, {})
      lists.map(async (obj, index) => {
        if (obj.index === undefined) {
          await DB.update(obj['_id'], { index }, `${collection}/${user}`) //eslint-disable-line
        }
        return null
      })
      const listTitleAndData = {
        lists,
        userData: userData[0],
        ownAcc: true,
      }
      ctx.body = JSON.stringify(listTitleAndData)
    }
  },

  update: async (ctx) => {
    const { user } = ctx.state
    if (user === null) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const { id, changes } = ctx.request.body
      await DB.update(id, changes, `${collection}/${user}`)
      ctx.body = JSON.stringify({ id, changes })
    }
  },

  create: async (ctx) => {
    const { user } = ctx.state
    if (user === null) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const lists = await DB.get(`${collection}/${user}`, {})
      const created = await DB.insert(
        { title: 'noname', visibility: true, index: lists.length },
        `${collection}/${user}`,
      )
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
      const deleted = await DB.remove(ObjectId(id), `${collection}/${user}`)
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
