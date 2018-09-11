const newID = () => Math.ceil(Math.random() * 999999)

export const logIn = name => ({
  type: 'LOG_IN',
  payload: {
    name,
    visibility: true,
    id: newID(),
    lists: [],
  },
})

export const logOut = () => ({
  type: 'LOG_OUT',
})

export const editUser = changes => ({
  type: 'EDIT_USER',
  payload: changes,
})

export const addList = () => ({
  type: 'ADD_LIST',
  payload: {
    id: newID(),
    title: 'no name',
    visibility: true,
    todos: [],
  },
})

export const removeList = id => ({
  type: 'REMOVE_LIST',
  payload: id,
})

export const editList = (id, changes) => ({
  type: 'EDIT_LIST',
  payload: {
    id,
    changes,
  },
})

export const addToDo = (listId, todoTitle) => ({
  type: 'ADD_TODO',
  payload: {
    id: listId,
    todo: {
      date: new Date().getTime() / 1000,
      id: newID(),
      title: todoTitle,
      chosen: false,
    },
  },
})

export const removeToDo = (listId, todoId) => ({
  type: 'REMOVE_TODO',
  payload: {
    listId,
    todoId,
  },
})

export const editToDo = (listId, todoId, changes) => ({
  type: 'EDIT_TODO',
  payload: {
    listId,
    todoId,
    changes,
  },
})
