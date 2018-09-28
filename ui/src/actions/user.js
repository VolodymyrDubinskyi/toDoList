// @flow

import {
  callEditUserInEndpoint,
  callTokenLogInEndpoint,
  callLogInEndpoint,
} from '../FetchCalls/user'


const logOut = (): Object => ({
  type: 'LOG_OUT',
})

type logInActionParams = {
  user: string,
  id: string,
  visibility: boolean,
}

const logInAction = (info: logInActionParams): Object => ({
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

export const logIn = (dispatch: Function) => (payload: callLogInParams) => {
  callLogInEndpoint(payload)
    .then((data) => {
      localStorage.setItem('token', data.token)
      dispatch(logInAction(data.info))
    })
}

export const tokenLogin = (dispatch: Function) => () => {
  callTokenLogInEndpoint()
    .then((data) => {
      dispatch(logInAction(data.info))
    })
}

const editUserAction = (changes: Object): Object => ({
  type: 'EDIT_USER',
  payload: changes,
})

export type callEditUserParams = {
  id: string,
  changes: Object,
  name: string,
}

export const editUser = (dispatch: Function) => (payload: callEditUserParams) => {
  callEditUserInEndpoint(payload)
    .then(data => data)
  dispatch(editUserAction(payload))
}

export default logOut
