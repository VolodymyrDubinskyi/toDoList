import { addNotification } from './notification';


import {
  callAddBoardEndpoint,
  callGetAllBoardsEndpoint,
  callGetBoardEndpoint,
} from '../FetchCalls/board'

import {
  changeBoard as changeBoardSocket,
} from '../socket'

export type addBoardActionParams = {
  id: string,
  title: string,
  visibility: boolean,
  index: number,
  todos: Array<Object>,
}

const addBoardAction = (data: addBoardActionParams): Object => ({
  type: 'ADD_BOARD',
  payload: {
    id: data.id,
    title: data.title,
    color: data.color,
    lists: JSON.parse(data.lists),
    index: data.index,
    private: data.private,
    usersWithAccess: JSON.parse(data.usersWithAccess),
  },
})

const removeBoardAction = (id: string): Object => ({
  type: 'REMOVE_BOARD',
  payload: id,
})

export const addBoard = (dispatch: Function) => (user, payload) => {
  callAddBoardEndpoint(user, payload)
    .then((data) => {
      const gettedData = data[0] ? data[0] : data
      if (gettedData) {
        addNotification(dispatch)({
          type: 'success',
          head: 'U create Board',
          info: `${gettedData.id} - get created`,
          id: Math.ceil(Math.random() * 9999999999),
        })
        dispatch(addBoardAction(gettedData))
      }
    })
    .catch(() => {
      addNotification(dispatch)({
        type: 'error',
        head: 'Something go wrong',
        info: '',
        id: Math.ceil(Math.random() * 9999999999),
      })
    })
}


export const removeBoard = (dispatch: Function) => (payload: string) => {
  dispatch(removeBoardAction(payload))
}


export const getAllBoards = (dispatch: Function) => (userId) => {
  callGetAllBoardsEndpoint(userId)
    .then((data: { Boards: Array<Object> }) => {
      data.boards.map((obj) => {
        if (obj) dispatch(addBoardAction(obj))
        return null
      })
    })
}

export const getBoard = (dispatch: Function) => (userId) => {
  callGetBoardEndpoint(userId)
    .then((data: { Boards: Array<Object> }) => {
      if (data.haventAccess === false) {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'error',
            head: 'U have no access to this page',
            info: '',
            id: Math.ceil(Math.random() * 9999999999),
          },
        })
      } else {
        dispatch(addBoardAction(data))
      }
    })
}


const editBoardAction = (id: string, changes: Object): Object => ({
  type: 'EDIT_BOARD',
  payload: {
    id,
    changes,
  },
})

export type callEditBoardParams = {
  id: string,
  changes: Object,
}


export const editBoard = (dispatch: Function) => (id, changes) => {
  changeBoardSocket(editBoardAction(id, changes))
  dispatch(editBoardAction(id, changes))
}
