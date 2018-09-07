import React from 'react';
import ReactDOM from 'react-dom';
import ListContainer from './components/ListContainer'
import RegistrationContainer from './components/RegistrationContainer'
import AuthorizationContainer from './components/AuthorizationContainer'
import Header from './components/Header'
import ReactToDo from './components/ReactToDo'


import './main.scss'

const todolist = document.getElementById('todolist')
const header = new Header(todolist) // eslint-disable-line
const listContainer = new ListContainer(todolist, header) // eslint-disable-line
new RegistrationContainer(todolist, header) // eslint-disable-line
new AuthorizationContainer(todolist, listContainer, header) // eslint-disable-line

ReactDOM.render(
  <ReactToDo/>,
  document.getElementById('root'),
);
