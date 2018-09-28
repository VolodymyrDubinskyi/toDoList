// @flow

import {
  callAddToDoEndpoint,
  callGetAllToDoEndpoint,
} from '../FetchCalls/todo'

type addToDoActionParams = {
  _id: string,
  payload: {
    listId: string,
    value: string,
    chosen: boolean,
    date: string,
    index: number,
  }
}

const addToDoAction = (data: addToDoActionParams): Object => ({
  type: 'ADD_TODO',
  payload: {
    id: data.payload.listId,
    todo: {
      date: data.payload.date,
      id: data._id, //eslint-disable-line
      title: data.payload.value,
      chosen: data.payload.chosen,
      index: data.payload.index,
    },
  },
})

export type callAddToDoParams = {
  listId: string,
  value: string,
}

export const addToDo = (dispatch: Function) => (payload: callAddToDoParams) => {
  callAddToDoEndpoint(payload)
    .then((data) => {
      const newData = data[0]
      dispatch(addToDoAction(newData))
    })
}

export const getAllToDos = (dispatch: Function) => (payload: string) => {
  callGetAllToDoEndpoint(payload)
    .then((data) => {
      data.todoData.map(todo => dispatch(addToDoAction(todo)))
    })
}


export const removeToDoAction = (listId: string, todoId: string): Object => ({
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

export const removeToDo = (dispatch: Function) => (payload: callRemoveToDoParams) => {
  dispatch(removeToDoAction(payload.listId, payload.todoId))
}


const editToDoAction = (listId: string, todoId: string, changes: Object): Object => ({
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

export const editToDo = (dispatch: Function) => (payload: callEditToDoParams) => {
  const { changes } = payload
  if (changes.value) {
    changes.title = changes.value
    changes.value = null
  }
  dispatch(editToDoAction(payload.listId, payload.todoId, payload.changes))
}
