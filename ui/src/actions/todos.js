
import { webServer } from '../../../config'


const addToDoAction = data => ({
  type: 'ADD_TODO',
  payload: {
    id: data.payload.listId,
    todo: {
      date: data.payload.date,
      id: data['_id'],
      title: data.payload.value,
      chosen: data.payload.chosen,
    },
  },
})

const callAddToDoEndpoint = payload => fetch(
  `http://${webServer.host}:${webServer.port}/todos/`,
  {
    method: 'POST',
    body: JSON.stringify({ payload }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'X-Access-Token': localStorage.getItem('token'),
    },
  },
).then(response => response.json())

export const addToDo = dispatch => (payload) => {
  callAddToDoEndpoint(payload)
    .then((data) => {
      const newData = data[0]
      dispatch(addToDoAction(newData))
    })
}

const callGetAllTosDoEndpoint = payload => fetch(
  `http://${webServer.host}:${webServer.port}/todos/${payload}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'X-Access-Token': localStorage.getItem('token'),
    },
  },
).then(response => response.json())


export const getAllToDos = dispatch => (payload) => {
  callGetAllTosDoEndpoint(payload)
    .then((data) => {
      data.todoData.map(todo => dispatch(addToDoAction(todo)))
    })
}

const removeToDoAction = (listId, todoId) => ({
  type: 'REMOVE_TODO',
  payload: {
    listId,
    todoId,
  },
})

const callRemoveToDoEndpoint = payload => fetch(
  `http://${webServer.host}:${webServer.port}/todos/${payload.userId}/${payload.listId}`,
  {
    method: 'DELETE',
    body: JSON.stringify({
      id: payload.todoId,
      listTitle: payload.listId,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'X-Access-Token': localStorage.getItem('token'),
    },
  },
).then(response => response.json())

export const removeToDo = dispatch => (payload) => {
  callRemoveToDoEndpoint(payload)
    .then((data) => {
      dispatch(removeToDoAction(data))
    })
}


const editToDoAction = (listId, todoId, changes) => ({
  type: 'EDIT_TODO',
  payload: {
    listId,
    todoId,
    changes,
  },
})

const callEditToDoEndpoint = payload => fetch(
  `http://${webServer.host}:${webServer.port}/todos/${payload.userId}/${payload.listId}`,
  {
    method: 'PATCH',
    body: JSON.stringify({
      id: payload.todoId,
      listTitle: payload.listId,
      changes: payload.changes,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'X-Access-Token': localStorage.getItem('token'),
    },
  },
).then(response => response.json())

export const editToDo = dispatch => (payload) => {
  callEditToDoEndpoint(payload)
    .then((data) => {
      const { changes } = data
      if (changes.value) {
        changes.title = changes.value
        changes.value = null
      }
      dispatch(editToDoAction(data.listId, data.todoId, data.changes))
    })
}
