import { addNotification } from './notification';

import {
  getAllToDos,
} from './todos'
import {
  callAddListEndpoint,
  callGetAllListsEndpoint,
} from '../FetchCalls/list'

export type addListActionParams = {
  id: string,
  title: string,
  visibility: boolean,
  index: number,
  todos: Array<Object>,
}

const addListAction = (data: addListActionParams): Object => ({
  type: 'ADD_LIST',
  payload: {
    id: data.id, // eslint-disable-line
    title: data.title,
    todos: JSON.parse(data.todos),
    index: data.index,
  },
})

const removeListAction = (id: string): Object => ({
  type: 'REMOVE_LIST',
  payload: id,
})

export const addList = (dispatch: Function) => () => {
  callAddListEndpoint()
    .then((data) => {
      const gettedData = data[0] ? data[0] : data
      if (gettedData) {
        addNotification(dispatch)({
          type: 'success',
          head: 'U create List',
          info: `${gettedData.id} - get created`, //eslint-disable-line
          id: Math.ceil(Math.random() * 9999999999),
        })
      }
      dispatch(addListAction(gettedData))
      getAllToDos(dispatch)(gettedData.id) //eslint-disable-line
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
  dispatch(removeListAction(payload))
}


export const getAllLists = (dispatch: Function) => () => {
  callGetAllListsEndpoint()
    .then((data: { lists: Array<Object> }) => {
      data.lists.map((obj) => {
        dispatch(addListAction(obj[0]))
        getAllToDos(dispatch)(obj[0].id) //eslint-disable-line
        return null
      })
    })
}


const editListAction = (id: string, changes: Object): Object => ({
  type: 'EDIT_LIST',
  payload: {
    id,
    changes,
  },
})

export type callEditListParams = {
  id: string,
  changes: Object,
}


export const editList = (dispatch: Function) => (payload: callEditListParams) => {
  dispatch(editListAction(payload.id, payload.changes))
}
