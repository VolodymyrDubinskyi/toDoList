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

const delay = ms => new Promise(res => setTimeout(res, ms))

function* editTodoAsync(action) {
  const { payload } = action
  const oldState = yield select();
  const { todoId } = payload
  const changeKey = Object.keys(payload.changes)[0]
  const todo = oldState.todos.filter(elem => elem.id === todoId)[0];
  try {
    yield put({ type: 'EDIT_TODO_REDUCER', payload });
    yield callEditToDoEndpoint(payload)
    yield put({
      type: 'ADD_NOTIFICATION',
      payload: {
        type: 'info',
        head: 'Todo edited',
        info: '',
        id: Math.ceil(Math.random() * 9999999999),
      },
    })
  } catch (err) {
    yield (delay(2000))
    yield put({
      type: 'ADD_NOTIFICATION',
      payload: {
        type: 'error',
        head: 'Some connection problems, pls try aging',
        info: '',
        id: Math.ceil(Math.random() * 9999999999),
      },
    })
    if (todo) payload.changes[changeKey] = todo[changeKey]
    yield put({ type: 'EDIT_TODO_REDUCER', payload });
  }
}

function* watchEditTodoAsync() {
  yield takeEvery('EDIT_TODO', editTodoAsync)
}


function* removeTodoAsync(action) {
  const { payload } = action
  const oldState = yield select();
  const { listId, todoId } = payload

  let listWithDeleted
  oldState.lists.map((obj) => {
    obj.todos.map((id) => {
      if (id === todoId) {
        listWithDeleted = obj
      }
      return null
    })
    return null
  })

  const listWhereWasDeleted = oldState.lists.filter(elem => elem.id === listId)[0]
  const [...todosWithDeleted] = listWithDeleted.todos
  const [...todosWhereWasDeleted] = listWhereWasDeleted.todos

  todosWhereWasDeleted.push(todoId)
  todosWithDeleted.splice(todosWithDeleted.indexOf(todoId), 1)

  try {
    yield callRemoveToDoEndpoint(payload)
    yield put({ type: 'REMOVE_TODO_REDUCER', payload });
    yield put({
      type: 'ADD_NOTIFICATION',
      payload: {
        type: 'info',
        head: 'Todo removed',
        info: '',
        id: Math.ceil(Math.random() * 9999999999),
      },
    })
  } catch (err) {
    yield (delay(2000))
    yield put({
      type: 'ADD_NOTIFICATION',
      payload: {
        type: 'error',
        head: 'Some connection problems, pls try aging',
        info: '',
        id: Math.ceil(Math.random() * 9999999999),
      },
    })
    const payloadDeleteTodo = {
      id: listWithDeleted.id,
      changes: {
        todos: todosWithDeleted,
      },
    }
    const payloadAddTodo = {
      id: listWhereWasDeleted.id,
      changes: {
        todos: todosWhereWasDeleted,
      },
    }

    yield put({ type: 'EDIT_LIST_REDUCER', payload: payloadDeleteTodo })
    yield put({ type: 'EDIT_LIST_REDUCER', payload: payloadAddTodo })
  }
}

function* watchRemoveTodoAsync() {
  yield takeEvery('REMOVE_TODO', removeTodoAsync)
}

function* editListAsync(action) {
  const { payload } = action
  const oldState = yield select();
  const { id } = payload
  const changeKey = Object.keys(payload.changes)[0]
  const list = oldState.lists.filter(elem => elem.id === id)[0];
  try {
    yield put({ type: 'EDIT_LIST_REDUCER', payload });
    yield callEditListEndpoint(payload)
    yield put({
      type: 'ADD_NOTIFICATION',
      payload: {
        type: 'info',
        head: 'List edited',
        info: '',
        id: Math.ceil(Math.random() * 9999999999),
      },
    })
  } catch (err) {
    yield (delay(2000))
    yield put({
      type: 'ADD_NOTIFICATION',
      payload: {
        type: 'error',
        head: 'Some connection problems, pls try aging',
        info: '',
        id: Math.ceil(Math.random() * 9999999999),
      },
    })
    if (changeKey !== 'todos') {
      payload.changes[changeKey] = list[changeKey]
      yield put({ type: 'EDIT_LIST_REDUCER', payload });
      yield put({ type: 'EDIT_LIST_REDUCER', payload });
    }
  }
}

function* watchEditListAsync() {
  yield takeEvery('EDIT_LIST', editListAsync)
}

function* removeListAsync(action) {
  const { payload } = action
  yield callRemoveListEndpoint(payload)
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
