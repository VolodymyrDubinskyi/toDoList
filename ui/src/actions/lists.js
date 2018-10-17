import { addNotification } from './notification';

import {
  getAllToDos,
} from './todos'
import {
  callAddListEndpoint,
  callGetAllListsEndpoint,
} from '../FetchCalls/list'
import {
  addList as addListSocket,
  changeList as changeListSocket,
  removeList as removeListSocket,
} from '../socket'

export type addListActionParams = {
  id: string,
  title: string,
  visibility: boolean,
  index: number,
  todos: Array<Object>,
  listId: number,
}

const addListAction = (data: addListActionParams): Object => ({
  type: 'ADD_LIST',
  payload: {
    id: data.id,
    title: data.title,
    todos: JSON.parse(data.todos),
    index: data.index,
    listId: data.id,
  },
})

const removeListAction = (id: string): Object => ({
  type: 'REMOVE_LIST',
  payload: id,
})

export const addList = (dispatch: Function) => () => {
  const listId = window.location.pathname.split('/')[4]
  callAddListEndpoint(listId)
    .then((data) => {
      const gettedData = data[0] ? data[0] : data
      if (gettedData) {
        addNotification(dispatch)({
          type: 'success',
          head: 'U create List',
          info: `${gettedData.id} - get created`,
          id: Math.ceil(Math.random() * 9999999999),
        })
      }
      gettedData.listId = listId
      dispatch(addListAction(gettedData))
      addListSocket(addListAction(gettedData))
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


export const removeList = (dispatch: Function) => (payload: string) => {
  removeListSocket(removeListAction(payload))
  dispatch(removeListAction(payload))
}


export const getAllLists = (dispatch: Function) => (payload) => {
  callGetAllListsEndpoint(payload)
    .then((data: { lists: Array<Object> }) => {
      data.lists.map((obj) => {
        dispatch(addListAction(obj[0]))
        getAllToDos(dispatch)(obj[0].id)
        return null
      })
    })
}


const editListAction = (id: string, changes: Object, boardId: string): Object => ({
  type: 'EDIT_LIST',
  payload: {
    id,
    changes,
    boardId,
  },
})

export type callEditListParams = {
  id: string,
  changes: Object,
  boardId: string,
}


export const editList = (dispatch: Function) => (payload: callEditListParams) => {
  changeListSocket(editListAction(payload.id, payload.changes, payload.boardId))
  dispatch(editListAction(payload.id, payload.changes, payload.boardId))
}
