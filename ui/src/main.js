import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, Provider } from '../react-myRedux'
import { combine } from './reducers'
import ToDo from './components/ToDo'
import './main.scss'

const store = createStore(combine);


ReactDOM.render(
  <Provider store={store}>
    <ToDo />
  </Provider>,
  document.getElementById('root'),
);
