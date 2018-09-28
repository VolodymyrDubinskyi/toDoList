import config from '../../config'

const { webServer } = config

export const callEditUserInEndpoint = payload => fetch(
  `http://${webServer.host}:${webServer.port}/users/${payload.name}`,
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

export const callTokenLogInEndpoint = () => fetch(
  `http://${webServer.host}:${webServer.port}/users/login`, {
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

export const callLogInEndpoint = payload => fetch(
  `http://${webServer.host}:${webServer.port}/users/${payload.name}/login`,
  {
    method: 'POST',
    body: JSON.stringify({
      password: payload.password,
      login: payload.name,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  },
).then(response => response.json())
