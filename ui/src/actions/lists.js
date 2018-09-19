import { webServer } from '../../../config'

const addListAction = data => ({
  type: 'ADD_LIST',
  payload: {
    id: data['_id'],
    title: data.title,
    visibility: data.visibility,
    todos: [],
  },
})

const removeListAction = id => ({
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
      'X-Access-Token': localStorage.getItem('token'),
    },
  },
).then(response => response.json())

export const addList = dispatch => (payload) => {
  callAddListEndpoint(payload)
    .then((data) => {
      dispatch(addListAction(data[0]))
    })
}

const callRemoveListEndpoint = payload => fetch(
  `http://${webServer.host}:${webServer.port}/lists`,
  {
    method: 'DELETE',
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

export const removeList = dispatch => (payload) => {
  callRemoveListEndpoint(payload)
    .then((id) => {
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
    'X-Access-Token': localStorage.getItem('token'),
  },
}).then(response => response.json())

export const getAllLists = dispatch => (payload) => {
  callGetAllListsEndpoint(payload)
    .then((data) => {
      data.lists.map(obj => dispatch(addListAction(obj)))
    })
}

const editListAction = (id, changes) => ({
  type: 'EDIT_LIST',
  payload: {
    id,
    changes,
  },
})

const callEditListEndpoint = payload => fetch(
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
      'X-Access-Token': localStorage.getItem('token'),
    },
  },
).then(response => response.json())

export const editList = dispatch => (payload) => {
  callEditListEndpoint(payload)
    .then((data) => {
      dispatch(editListAction(data.id, data.changes))
    })
}
