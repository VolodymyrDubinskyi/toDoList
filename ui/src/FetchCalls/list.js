import config from '../../config'

const { webServer } = config

export const callAddListEndpoint = payload => fetch(
  `http://${webServer.host}:${webServer.port}/lists`,
  {
    method: 'POST',
    body: JSON.stringify({ id: payload }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'X-Access-Token': localStorage.getItem('token') || '',
    },
  },
).then(response => response.json())

export const callRemoveListEndpoint = payload => fetch(
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

export const callGetAllListsEndpoint = payload => fetch(`http://${webServer.host}:${webServer.port}/lists/${payload}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'X-Access-Token': localStorage.getItem('token') || '',
  },
}).then(response => response.json())


export const callEditListEndpoint = payload => fetch(
  `http://${webServer.host}:${webServer.port}/lists`,
  {
    method: 'PATCH',
    body: JSON.stringify({
      id: payload.id,
      changes: payload.changes,
      boardId: payload.boardId,
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
