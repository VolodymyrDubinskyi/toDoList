const DB = require('../services/db');
const Todo = require('../schems/todo')
const List = require('../schems/list')


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
        _id: listId,
      }, List)

      let todos = newList[0].todos.map(async (id) => {
        const list = await DB.get({
          _id: id,
        }, Todo)
        return list
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
      const deleted = await DB.remove({ _id: id }, List)
      List.findById(listTitle, (err, newList) => { //eslint-disable-line
        const index = newList.todos.indexOf(id); //eslint-disable-line
        newList.todos.splice(index, 1)
        newList.save();
      });
      ctx.body = deleted;
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
      const allLists = await DB.get({}, List)

      const { body } = ctx.request
      const todo = {
        title: body.payload.value,
        index: allLists.length,
      }
      const created = await DB.insert(todo, Todo)
      await List.findById(list, async (err, newList) => {
        newList.todos.push(created['_id']); //eslint-disable-line
        newList.save();
        ctx.body = JSON.stringify({
          _id: list,
          payload: {
            id: created['_id'], //eslint-disable-line
            title: body.payload.value,
            index: allLists.length,
          },
        })
      });
    }
  },
}
