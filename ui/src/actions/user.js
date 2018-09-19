import { webServer } from '../../../config'

const logInAction = info => ({
  type: 'LOG_IN',
  payload: {
    name: info.user,
    visibility: info.visibility,
    id: info.id,
    lists: [],
    currentList: '',
  },
})

const callLogInEndpoint = payload => fetch(
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

export const logIn = dispatch => (payload) => {
  callLogInEndpoint(payload)
    .then((data) => {
      localStorage.setItem('token', data.token)
      dispatch(logInAction(data.info))
    })
}

const callTokenLogInEndpoint = () => fetch(
  `http://${webServer.host}:${webServer.port}/users/login`, {
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


export const tokenLogin = dispatch => () => {
  callTokenLogInEndpoint()
    .then((data) => {
      dispatch(logInAction(data.info))
    })
}

const editUserAction = changes => ({
  type: 'EDIT_USER',
  payload: changes,
})

const callEditUserInEndpoint = payload => fetch(
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
      'X-Access-Token': localStorage.getItem('token'),
    },
  },
).then(response => response.json())

export const editUser = dispatch => (payload) => {
  callEditUserInEndpoint(payload)
    .then((data) => {
      dispatch(editUserAction(data))
    })
}
