import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import List from './List'
import Registration from './Registration'
import Authorization from './Authorization'
import Header from './Header'


class ToDo extends React.Component {
  createNewUser = (login, password) => {
    console.log(`login ${login}`)
    console.log(`password ${password}`)
  }

  tryAuthorize = () => { }


  checkLoginExisting = () => false

  render() {
    console.log(this.props.state)

    return (
      <Router>
        <div style={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}>
          <Switch>
            <Route exact path="/registration" component={() => <Registration
              createNewUser={this.createNewUser}
              checkLoginExisting={this.checkLoginExisting} />} />
            <Route exact path="/authorization" component={() => <Authorization tryAuthorize={this.tryAuthorize} />} />
            <Route exact path="/" component={() => <Authorization tryAuthorize={this.tryAuthorize} />} />
            <Route exact path="*" component={() => <List />
            } />
          </Switch>
          <Header />
        </div>
      </Router>
    )
  }
}


ToDo.propTypes = {
  state: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  state,
})

export default connect(mapStateToProps, null)(ToDo)
