import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import 'react-notifications/lib/notifications.css'


import combine from './reducers'
import ToDo from './components/ToDo'
import './main.scss'
import saga from './sagas'
import { socket } from './socket'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(combine, applyMiddleware(sagaMiddleware));

socket.on('change todo', action => store.dispatch(action));
socket.on('change list', action => store.dispatch(action));
socket.on('add todo', action => store.dispatch(action));
socket.on('add list', action => store.dispatch(action));
socket.on('remove todo', action => store.dispatch(action));
socket.on('remove list', action => store.dispatch(action));

sagaMiddleware.run(saga)

ReactDOM.render(
  <Provider store={store}>
    <ToDo />
  </Provider>,
  document.getElementById('root'),
);
