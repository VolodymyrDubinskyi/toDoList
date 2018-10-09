// @flow

import {
  callEditUserInEndpoint,
  callTokenLogInEndpoint,
  callLogInEndpoint,
} from '../FetchCalls/user'

import {
  getAllBoards,
} from './boards'

const logOut = (): Object => ({
  type: 'LOG_OUT',
})

type logInActionParams = {
  user: string,
  id: string,
  boards: Array<string>,
}

const logInAction = (info: logInActionParams): Object => ({
  type: 'LOG_IN',
  payload: {
    name: info.user,
    id: info.id,
    boards: info.boards,
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
      getAllBoards(dispatch)(data.info.id)
    })
}

export const tokenLogin = (dispatch: Function) => () => {
  callTokenLogInEndpoint()
    .then((data) => {
      dispatch(logInAction(data.info))
      getAllBoards(dispatch)(data.info.id)
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

const clearStoreAction = (): Object => ({
  type: 'CLEAR_STORE',
  payload: {},
})

export const clearListsAndTodos = (): Object => ({
  type: 'CLEAR_LIST_AND_TODO',
  payload: {},
})

export const clearStore = (dispatch: Function) => () => {
  dispatch(clearStoreAction())
}

export const editUser = (dispatch: Function) => (payload: callEditUserParams) => {
  callEditUserInEndpoint(payload)
    .then(data => data)
  dispatch(editUserAction(payload))
}

export default logOut
