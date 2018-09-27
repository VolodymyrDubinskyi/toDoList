const { ObjectId } = require('mongodb');
const DB = require('../services/db');
const config = require('../config/index')

const collection = config.DBCollections.todos
const collectionLists = config.DBCollections.lists

module.exports = {
  list: async (ctx) => {
    const { user } = ctx.state
    const list = ctx.params.id
    if (user === 'null') {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const checkList = await DB.get(`${collectionLists}/${user}`, { _id: ObjectId(list) })
      const todoData = await DB.get(`${collection}/${user}/${list}`, {})
      todoData.map(async (obj, index) => {
        if (obj.index === undefined) {
          await DB.update(obj['_id'], { index }, `${collection}/${user}/${list}`) //eslint-disable-line
        }
        return null
      })
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
      const { id } = ctx.request.body
      let { changes } = ctx.request.body
      let todoData = await DB.get(`${collection}/${user}/${list}`, { _id: ObjectId(id) })
      todoData = todoData[0] //eslint-disable-line
      if (todoData) changes = Object.assign({}, todoData.payload, changes)
      await DB.update(id, { payload: changes }, `${collection}/${user}/${list}`)
      ctx.body = JSON.stringify({
        listId: list,
        todoId: id,
        changes: ctx.request.body.changes,
      })
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
      const todoId = ctx.request.body.id
      await DB.remove(todoId, `${collection}/${user}/${list}`)
      ctx.body = JSON.stringify({
        todoId,
        listId: list,
      });
    }
  },


  create: async (ctx) => {
    const { user } = ctx.state
    const list = ctx.request.body.payload.listId
    if (user === null) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const { body } = ctx.request
      body.payload.date = new Date().getTime() / 1000
      body.payload.chosen = false
      const todoData = await DB.get(`${collection}/${user}/${list}`, {})
      if (body.payload.index === undefined) body.payload.index = todoData.length
      const created = await DB.insert(body, `${collection}/${user}/${list}`)
      ctx.body = created;
    }
  },

  checkUserTodo: async (ctx) => {
    let { id, listId } = ctx.params
    id = id.toLowerCase()
    listId = listId.toLowerCase()
    const checkList = await DB.get(`${collectionLists}/${id}`, { _id: ObjectId(listId) })
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
