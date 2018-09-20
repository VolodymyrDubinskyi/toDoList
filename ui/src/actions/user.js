// @flow

import config from '../../config'

const { webServer } = config


const logOut = (): Object => ({
  type: 'LOG_OUT',
})

type logInActionParams = {
  user: string,
  id: string,
  visibility: boolean,
}

const logInAction = (info :logInActionParams) :Object => ({
  type: 'LOG_IN',
  payload: {
    name: info.user,
    visibility: info.visibility,
    id: info.id,
    lists: [],
    currentList: '',
  },
})

export type callLogInParams = {
  name: string,
  password: string,
}

const callLogInEndpoint = (payload :callLogInParams) => fetch(
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

export const logIn = (dispatch :Function) => (payload :callLogInParams) => {
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
      'X-Access-Token': localStorage.getItem('token') || '',
    },
  },
).then(response => response.json())

export const tokenLogin = (dispatch :Function) => () => {
  callTokenLogInEndpoint()
    .then((data) => {
      dispatch(logInAction(data.info))
    })
}

const editUserAction = (changes :Object) :Object => ({
  type: 'EDIT_USER',
  payload: changes,
})

export type callEditUserParams = {
  id: string,
  changes: Object,
  name: string,
}

const callEditUserInEndpoint = (payload :callEditUserParams) => fetch(
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

export const editUser = (dispatch :Function) => (payload :callEditUserParams) => {
  callEditUserInEndpoint(payload)
    .then((data) => {
      dispatch(editUserAction(data))
    })
}

export default logOut
