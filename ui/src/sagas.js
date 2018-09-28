import { takeEvery, all } from 'redux-saga/effects'

import {
  callRemoveToDoEndpoint,
  callEditToDoEndpoint,
} from './FetchCalls/todo'
import {
  callRemoveListEndpoint,
  callEditListEndpoint,
} from './FetchCalls/list'

function* editTodoAsync(action) {
  const { payload, type } = action
  const fetchPayload = yield callEditToDoEndpoint(payload)
  console.log(type)
  console.log(payload)
  console.log(fetchPayload)
}

function* watchEditTodoAsync() {
  yield takeEvery('EDIT_TODO', editTodoAsync)
}


function* removeTodoAsync(action) {
  const { payload, type } = action
  const fetchPayload = yield callRemoveToDoEndpoint(payload)
  console.log(type)
  console.log(payload)
  console.log(fetchPayload)
}

function* watchRemoveTodoAsync() {
  yield takeEvery('REMOVE_TODO', removeTodoAsync)
}

function* editListAsync(action) {
  const { payload, type } = action
  const fetchPayload = yield callEditListEndpoint(payload)
  console.log(type)
  console.log(payload)
  console.log(fetchPayload)
}

function* watchEditListAsync() {
  yield takeEvery('EDIT_LIST', editListAsync)
}

function* removeListAsync(action) {
  const { payload, type } = action
  const fetchPayload = yield callRemoveListEndpoint(payload)
  console.log(type)
  console.log(payload)
  console.log(fetchPayload)
}

function* watchRemoveListAsync() {
  yield takeEvery('REMOVE_LIST', removeListAsync)
}

export default function* rootSaga() {
  yield all([
    watchEditTodoAsync(),
    watchRemoveTodoAsync(),
    watchEditListAsync(),
    watchRemoveListAsync(),
  ])
}
