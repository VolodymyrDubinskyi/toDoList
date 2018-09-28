// @flow

import {
  getAllToDos,
} from './todos'
import {
  callAddListEndpoint,
  callGetAllListsEndpoint,
} from '../FetchCalls/list'

export type addListActionParams = {
  _id: string,
  title: string,
  visibility: boolean,
  index: number,
}

const addListAction = (data: addListActionParams): Object => ({
  type: 'ADD_LIST',
  payload: {
    id: data._id, // eslint-disable-line
    title: data.title,
    todos: [],
    index: data.index,
  },
})

const removeListAction = (id: string): Object => ({
  type: 'REMOVE_LIST',
  payload: id,
})

export const addList = (dispatch: Function) => () => {
  callAddListEndpoint()
    .then((data: Array<addListActionParams>) => {
      dispatch(addListAction(data[0]))
    })
}


export const removeList = (dispatch: Function) => (payload: string) => {
  dispatch(removeListAction(payload))
}


export const getAllLists = (dispatch: Function) => () => {
  callGetAllListsEndpoint()
    .then((data: { lists: Array<Object> }) => {
      data.lists.map((obj) => {
        dispatch(addListAction(obj))
        getAllToDos(dispatch)(obj['_id']) //eslint-disable-line
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
