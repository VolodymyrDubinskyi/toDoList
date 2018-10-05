const DB = require('../services/db');
const Todo = require('../sequelize/todo')
const List = require('../sequelize/list')


module.exports = {
  list: async (ctx) => {
    const { user } = ctx.state
    const listId = ctx.params.id
    if (user === undefined) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const newList = await DB.get({
        id: listId,
      }, List)

      let { todos } = newList[0]
      todos = JSON.parse(todos)
      todos = todos.map(async (id) => {
        const list = await DB.get({
          id,
        }, Todo)
        return list[0]
      })

      todos = await Promise.all(todos)

      const listTitleAndData = {
        todoData: todos,
        listInfo: listId,
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
      await DB.update(id, changes, Todo)
      ctx.body = JSON.stringify({ id, changes })
    }
  },

  remove: async (ctx) => {
    const { user } = ctx.state
    const { id, listTitle } = ctx.request.body
    if (user === null) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const getList = await DB.get({ id: listTitle }, List)
      let { todos } = getList[0]
      todos = JSON.parse(todos)
      todos.splice(todos.indexOf(id), 1)

      todos = await DB.update(listTitle, { todos }, List)
      ctx.body = todos;
    }
  },

  create: async (ctx) => {
    const { user } = ctx.state
    const list = ctx.request.body.payload.listId
    if (user === undefined) {
      ctx.body = JSON.stringify({})
      ctx.status = 401;
      ctx.throw(401, 'Unauthorized');
    } else {
      const allTodos = await DB.get({}, Todo)

      const { body } = ctx.request
      const todo = {
        title: body.payload.value,
        index: allTodos.length,
      }
      const created = await DB.insert(todo, Todo)
      const getList = await DB.get({ id: list }, List)
      let { todos } = getList[0]
      todos = JSON.parse(todos)
      todos.push(created.id)

      await DB.update(list, { todos }, List)
      ctx.body = created;
    }
  },
}
