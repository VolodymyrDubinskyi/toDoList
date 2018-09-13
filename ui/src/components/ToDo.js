import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom'
import List from './List'
import Registration from './Registration'
import Authorization from './Authorization'
import Header from './Header'


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
      <Route exact path="/authorization" component={() => <Authorization />} />
      <Route exact path="/" component={() => <Authorization />} />
      <Route exact path="*" component={() => <List />
      } />
    </Switch>
    <Header />
  </div>
</Router>


export default ToDo
