// @flow

import config from '../../config'

const { webServer } = config

type addToDoActionParams = {
  _id: string,
  index: number,
  payload: {
    listId: string,
    value: string,
    chosen: boolean,
    date: string,
  }
}

const addToDoAction = (data: addToDoActionParams) :Object => ({
  type: 'ADD_TODO',
  payload: {
    id: data.payload.listId,
    todo: {
      date: data.payload.date,
      id: data._id, //eslint-disable-line
      title: data.payload.value,
      chosen: data.payload.chosen,
      index: data.index,
    },
  },
})

export type callAddToDoParams = {
  listId: string,
  value: string,
}

const callAddToDoEndpoint = (payload: callAddToDoParams) => fetch(
  `http://${webServer.host}:${webServer.port}/todos/`,
  {
    method: 'POST',
    body: JSON.stringify({ payload }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'X-Access-Token': localStorage.getItem('token') || '',
    },
  },
).then(response => response.json())

export const addToDo = (dispatch :Function) => (payload :callAddToDoParams) => {
  callAddToDoEndpoint(payload)
    .then((data) => {
      const newData = data[0]
      dispatch(addToDoAction(newData))
    })
}

const callGetAllTosDoEndpoint = (payload :string) => fetch(
  `http://${webServer.host}:${webServer.port}/todos/${payload}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'X-Access-Token': localStorage.getItem('token') || '',
    },
  },
).then(response => response.json())


export const getAllToDos = (dispatch :Function) => (payload :string) => {
  callGetAllTosDoEndpoint(payload)
    .then((data) => {
      data.todoData.map(todo => dispatch(addToDoAction(todo)))
    })
}


const removeToDoAction = (listId :string, todoId :string) :Object => ({
  type: 'REMOVE_TODO',
  payload: {
    listId,
    todoId,
  },
})


export type callRemoveToDoParams = {
  listId: string,
  userId: string,
  todoId: string,
}

const callRemoveToDoEndpoint = (payload :callRemoveToDoParams) => fetch(
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
      'X-Access-Token': localStorage.getItem('token') || '',
    },
  },
).then(response => response.json())

export const removeToDo = (dispatch :Function) => (payload :callRemoveToDoParams) => {
  callRemoveToDoEndpoint(payload)
    .then((data: {listId: string, todoId:string}) => {
      dispatch(removeToDoAction(data.listId, data.todoId))
    })
}


const editToDoAction = (listId :string, todoId :string, changes :string) :Object => ({
  type: 'EDIT_TODO',
  payload: {
    listId,
    todoId,
    changes,
  },
})

export type callEditToDoParams = {
  listId: string,
  userId: string,
  todoId: string,
  changes: Object,
}

const callEditToDoEndpoint = (payload :callEditToDoParams) => fetch(
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
      'X-Access-Token': localStorage.getItem('token') || '',
    },
  },
).then(response => response.json())

export const editToDo = (dispatch :Function) => (payload :callEditToDoParams) => {
  callEditToDoEndpoint(payload)
    .then((data :Object) => {
      const { changes } = data
      if (changes.value) {
        changes.title = changes.value
        changes.value = null
      }
      dispatch(editToDoAction(data.listId, data.todoId, data.changes))
    })
}
