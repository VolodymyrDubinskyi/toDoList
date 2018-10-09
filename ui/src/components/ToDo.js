// @flow

import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom'
import { NotificationContainer } from 'react-notifications';

import Bords from './Boards'
import List from './List'
import Registration from './Registration'
import AuthorizationWithConnect from './Authorization'
import HeaderWithConnect from './Header'

const ToDo = () => <Router>
  <div style={{
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  }}>
    <Switch>
      <Route exact path="/registration" component={() => <Registration />} />
      <Route exact path="/authorization" component={() => <AuthorizationWithConnect />} />
      <Route exact path="/" component={() => <AuthorizationWithConnect />} />
      <Route exact path="/user/:user/board/:board" component={() => <List />} />
      <Route exact path="/user/:user" component={() => <Bords />} />
      <Route exact path="*" component={() => <div
        style={{
          fontSize: '3em',
        }}
      >Page not exist</div>} />
    </Switch>
    <HeaderWithConnect />
    <NotificationContainer />
  </div>
</Router>


export default ToDo
