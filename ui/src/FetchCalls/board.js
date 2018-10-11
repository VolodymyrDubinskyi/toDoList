import config from '../../config'

const { webServer } = config

export const callAddBoardEndpoint = (user, payload) => fetch(
  `http://${webServer.host}:${webServer.port}/boards/${user.id}`,
  {
    method: 'POST',
    body: JSON.stringify({ ...payload }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'X-Access-Token': localStorage.getItem('token') || '',
    },
  },
).then(response => response.json())


export const callRemoveBoardEndpoint = (user, payload) => fetch(
  `http://${webServer.host}:${webServer.port}/boards/${user.id}`,
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

export const callGetAllBoardsEndpoint = userId => fetch(`http://${webServer.host}:${webServer.port}/boards/${userId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'X-Access-Token': localStorage.getItem('token') || '',
  },
}).then(response => response.json())

export const callGetBoardEndpoint = userId => fetch(`http://${webServer.host}:${webServer.port}/board/${userId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'X-Access-Token': localStorage.getItem('token') || '',
  },
}).then(response => response.json())

export const callEditBoardEndpoint = payload => fetch(
  `http://${webServer.host}:${webServer.port}/boards/${payload.id}`,
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
)
