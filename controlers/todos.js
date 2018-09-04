const { ObjectId } = require('mongodb');
const DB = require('../services/db');
const config = require('../config/index')

const collection = config.DBCollections.todos
const collectionLists = config.DBCollections.lists

module.exports = {
  list: async (ctx) => {
    let { id } = ctx.params
    id = id.toLowerCase()
    const { user } = ctx.state
    const list = ctx.params.id
    if (user === 'null') {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const checkList = await DB.get(`${collectionLists}/${user}`, { _id: ObjectId(id) })
      const todoData = await DB.get(`${collection}/${user}/${list}`, {})
      const listTitleAndData = {
        todoData,
        listInfo: checkList[0],
        ownAcc: true,
      }
      ctx.body = JSON.stringify(listTitleAndData)
    }
  },

  update: async (ctx) => {
    const { user } = ctx.state
    const list = ctx.request.body.listTitle
    if (user === null) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const { id } = ctx.params
      const changes = ctx.request.body
      const updated = await DB.update(id, changes, `${collection}/${user}/${list}`)
      ctx.body = JSON.stringify(updated)
    }
  },

  remove: async (ctx) => {
    const { user } = ctx.state
    const list = ctx.request.body.listTitle
    if (user === null) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const { id } = ctx.params
      const deleted = await DB.remove(id, `${collection}/${user}/${list}`)
      ctx.body = deleted;
    }
  },


  create: async (ctx) => {
    const { user } = ctx.state
    const list = ctx.request.body.listTitle
    if (user === null) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const { body } = ctx.request
      ctx.body = body;
      const created = await DB.insert(body, `${collection}/${user}/${list}`)
      ctx.body = created;
    }
  },

  checkUserTodo: async (ctx) => {
    let { id, listId } = ctx.params
    id = id.toLowerCase()
    listId = listId.toLowerCase()
    const checkList = await DB.get(`${collectionLists}/${id}`, { _id: ObjectId(listId) })
    console.log(checkList)
    if (ctx.state.user === null) {
      ctx.body = JSON.stringify({ commit: 'Please login to see todolists' })
    } else if (checkList[0] === undefined) {
      ctx.body = JSON.stringify({ commit: `User ${id} haven't ${listId} list` })
    } else if ((ctx.state.user !== id) && !checkList[0].visibility) {
      ctx.body = JSON.stringify({ commit: `You have no rights to acess ${listId} list` })
    } else {
      const todoData = await DB.get(`${collection}/${id}/${listId}`, {})
      const listTitleAndData = {
        todoData,
        listInfo: checkList[0],
        ownAcc: ctx.state.user === id,
      }
      ctx.body = JSON.stringify(listTitleAndData)
    }
  },
}
