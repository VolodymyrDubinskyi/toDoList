// @flow
import { addNotification } from './notification';

import {
  callAddToDoEndpoint,
  callGetAllToDoEndpoint,
} from '../FetchCalls/todo'

type addToDoActionParams = {
  id: string,
  payload: {
    id: string,
    title: string,
    index: number,
  }
}

const addToDoAction = (data: addToDoActionParams): Object => ({
  type: 'ADD_TODO',
  payload: {
    id: data.id,
    todo: {
      id: data.payload.id,
      title: data.payload.title,
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
      let newData = data[0] ? data[0] : data
      addNotification(dispatch)({
        type: 'success',
        head: 'U create Todo',
        info: `${newData.title} - get created`,
        id: Math.ceil(Math.random() * 9999999999),
      })
      newData = {
        id: payload.listId,
        payload: {
          id: newData.id,
          title: newData.title,
          index: newData.index,
        },
      }
      dispatch(addToDoAction(newData))
    })
}

export const getAllToDos = (dispatch: Function) => (payload: string) => {
  callGetAllToDoEndpoint(payload)
    .then((data) => {
      data.todoData.map((todo) => {
        if (todo) {
          const newTodo = {
            id: data.listInfo,
            payload: {
              id: todo.id, //eslint-disable-line
              title: todo.title,
              index: todo.index,
            },
          }
          dispatch(addToDoAction(newTodo))
        }
        return null
      })
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
    delete changes.value
  }
  dispatch(editToDoAction(payload.listId, payload.todoId, payload.changes))
}
