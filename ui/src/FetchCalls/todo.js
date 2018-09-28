import config from '../../config'

const { webServer } = config

export const callAddToDoEndpoint = payload => fetch(
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

export const callGetAllToDoEndpoint = payload => fetch(
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

export const callRemoveToDoEndpoint = payload => fetch(
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

export const callEditToDoEndpoint = payload => fetch(
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
