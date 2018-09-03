const DB = require('./db');

const collection = 'todos'

module.exports = {
  list: async (ctx) => {
    const { user } = ctx.state
    const list = ctx.params.id
    if (user === 'null') {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const todoData = await DB.get(`${collection}/${user}/${list}`, {})
      ctx.body = todoData
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
    console.log(ctx.params)
    id = id.toLowerCase()
    listId = listId.toLowerCase()
    if (ctx.state.user === null) {
      ctx.body = JSON.stringify({ commit: 'Please login to see todolists' })
    } else if (ctx.state.user !== id) {
      ctx.body = JSON.stringify({ commit: `You have no rights to acess ${id} todolist` })
    } else {
      const todoData = await DB.get(`${collection}/${id}/${listId}`, {})
      ctx.body = JSON.stringify(todoData)
    }
  },
}
