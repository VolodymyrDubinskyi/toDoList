const { ObjectId } = require('mongodb');
const DB = require('./db');

const collection = 'lists'

module.exports = {
  list: async (ctx) => {
    const { user } = ctx.state
    if (user === 'null') {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const todoData = await DB.get(`${collection}/${user}`, {})
      ctx.body = todoData
    }
  },

  update: async (ctx) => {
    const { user } = ctx.state
    if (user === null) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const { id, value } = ctx.request.body
      const updated = await DB.update(ObjectId(id), { title: value }, `${collection}/${user}`)
      ctx.body = JSON.stringify(updated)
    }
  },

  create: async (ctx) => {
    const { user } = ctx.state
    if (user === null) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const created = await DB.insert({ title: 'noname' }, `${collection}/${user}`)
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
      const { id } = ctx.request.body
      console.log(id)
      const deleted = await DB.remove(ObjectId(id), `${collection}/${user}`)
      ctx.body = deleted;
    }
  },

  getUserList: async (ctx) => {
    let { id } = ctx.params
    id = id.toLowerCase()
    if (ctx.state.user === null) {
      ctx.body = JSON.stringify({ commit: 'Please login to see todolists' })
    } else if (ctx.state.user !== id) {
      ctx.body = JSON.stringify({ commit: `You have no rights to acess ${id} todolist` })
    } else {
      const todoData = await DB.get(`${collection}/${id}`, {})
      ctx.body = JSON.stringify(todoData)
    }
  },

}
