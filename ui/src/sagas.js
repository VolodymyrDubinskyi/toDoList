import {
  takeEvery, all, put, select,
} from 'redux-saga/effects'

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
  const oldState = yield select();
  // console.log('oldState', oldState)

  yield put({ type: 'EDIT_TODO_REDUCER', payload });

  const fetchPayload = yield callEditToDoEndpoint(payload)
  // console.log(type)
  // console.log(payload)
  // console.log(fetchPayload)
}

function* watchEditTodoAsync() {
  yield takeEvery('EDIT_TODO', editTodoAsync)
}


function* removeTodoAsync(action) {
  const { payload, type } = action
  const fetchPayload = yield callRemoveToDoEndpoint(payload)
  // console.log(type)
  // console.log(payload)
  // console.log(fetchPayload)
}

function* watchRemoveTodoAsync() {
  yield takeEvery('REMOVE_TODO', removeTodoAsync)
}

function* editListAsync(action) {
  const { payload, type } = action
  const oldState = yield select();
  const { id } = payload
  const changeKey = Object.keys(payload.changes)[0]
  const list = oldState.lists.filter(elem => elem.id === id)[0];
  try {
    // console.log(payload)
    yield put({ type: 'EDIT_LIST_REDUCER', payload });
    yield callEditListEndpoint(payload)
  } catch (err) {
    payload.changes[changeKey] = list[changeKey]
    console.log(payload)
    yield put({ type: 'EDIT_LIST_REDUCER', payload });
  }
}

function* watchEditListAsync() {
  yield takeEvery('EDIT_LIST', editListAsync)
}

function* removeListAsync(action) {
  const { payload, type } = action
  const fetchPayload = yield callRemoveListEndpoint(payload)
  // console.log(type)
  // console.log(payload)
  // console.log(fetchPayload)
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
