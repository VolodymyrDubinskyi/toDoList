// @flow

import config from '../../config'
import {
  getAllToDos,
} from './todos'

const { webServer } = config

export type addListActionParams = {
  _id: string,
  title: string,
  visibility: boolean,
}

const addListAction = (data: addListActionParams): Object => ({
  type: 'ADD_LIST',
  payload: {
    id: data._id, // eslint-disable-line
    title: data.title,
    visibility: data.visibility,
    todos: [],
  },
})

const removeListAction = (id: string): Object => ({
  type: 'REMOVE_LIST',
  payload: id,
})

const callAddListEndpoint = () => fetch(
  `http://${webServer.host}:${webServer.port}/lists`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'X-Access-Token': localStorage.getItem('token') || '',
    },
  },
).then(response => response.json())

export const addList = (dispatch: Function) => () => {
  callAddListEndpoint()
    .then((data: Array<addListActionParams>) => {
      dispatch(addListAction(data[0]))
    })
}

const callRemoveListEndpoint = (payload: string) => fetch(
  `http://${webServer.host}:${webServer.port}/lists`,
  {
    method: 'DELETE',
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

export const removeList = (dispatch: Function) => (payload: string) => {
  callRemoveListEndpoint(payload)
    .then((id: string) => {
      dispatch(removeListAction(id))
    })
}

const callGetAllListsEndpoint = () => fetch(`http://${webServer.host}:${webServer.port}/lists`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'X-Access-Token': localStorage.getItem('token') || '',
  },
}).then(response => response.json())

export const getAllLists = (dispatch: Function) => () => {
  callGetAllListsEndpoint()
    .then((data: { lists: Array<Object> }) => {
      data.lists.map((obj) => {
        dispatch(addListAction(obj))
        getAllToDos(dispatch)(obj['_id']) //eslint-disable-line
        return null
      })
    })
}


const editListAction = (id: string, changes: Object): Object => ({
  type: 'EDIT_LIST',
  payload: {
    id,
    changes,
  },
})

export type callEditListParams = {
  id: string,
  changes: Object,
}

const callEditListEndpoint = (payload: callEditListParams) => fetch(
  `http://${webServer.host}:${webServer.port}/lists`,
  {
    method: 'PATCH',
    body: JSON.stringify({
      id: payload.id,
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

export const editList = (dispatch: Function) => (payload: callEditListParams) => {
  callEditListEndpoint(payload)
    .then((data: { id: string, changes: Object }) => {
      dispatch(editListAction(data.id, data.changes))
    })
}
