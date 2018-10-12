// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core';
import {
  withRouter, Link, Route, Switch,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications';

import type { callEditListParams } from '../actions/lists'
import type { callEditUserParams } from '../actions/user'
import { editList, addList } from '../actions/lists'
import logOut, { editUser, clearStore } from '../actions/user'
import { removeNotification } from '../actions/notification'
import type { userProps, listsProps } from '../props'

type Props = {
  lists: Array<listsProps>,
  user: userProps,
  editList: (callEditListParams) => void,
  editUser: (callEditUserParams) => void,
  logOut: () => void,
  history: Object,
  clearStore: Function,
  removeNotification: Function,
  notifications: Array<Object>,
};
type State = {
  titleEdit: boolean,
  editValue: string,
}

export class Header extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      titleEdit: false,
      editValue: '',
    };
  }

  editTitle = () => {
    this.setState({
      titleEdit: true,
      editValue: this.props.lists.filter(elem => elem.id === this.props.user.currentList)[0].title,
    });
  }

  updateValue(e: Object) {
    this.setState({
      editValue: e.target.value,
    });
  }

  changeTitle = (e: Object) => {
    if (e.keyCode === 13) {
      this.setState({
        titleEdit: false,
      });
      const changes = {
        title: this.state.editValue,
      }

      this.props.editList({
        name: this.props.user.name,
        id: this.props.user.currentList,
        changes,
      })
    }
  }

  stopEditing = () => {
    this.props.editUser({
      name: this.props.user.name,
      id: this.props.user.id,
      changes: {
        currentList: '',
      },
    })
    this.setState({
      titleEdit: false,
      editValue: '',
    });
  }

  render() {
    this.props.notifications.map((obj) => {
      NotificationManager[obj.type](obj.head, obj.info)
      this.props.removeNotification(obj.id)
      return null
    })
    const editTitle = <Switch>
      <Route exact path='/user/:name/list/:listId' component={() => (
        <span style={this.state.titleEdit ? { display: 'none' } : {
          color: 'black',
          display: 'inline-block',
          margin: 5,
          ontSize: '0.7em',
          fontStyle: 'italic',
          cursor: 'pointer',
        }}
          onClick={this.editTitle}
        >edit</span>)} />
      <Route exact path='/user/:name' component={() => ('')} />
    </Switch>

    const editField = <TextField
      style={(this.state.titleEdit ? { margin: 0 } : { display: 'none', margin: 0 })}
      value={this.state.editValue}
      onChange={e => this.updateValue(e)}
      margin="normal"
      onKeyDown={e => this.changeTitle(e)}
    />

    return (
      <div className={'header'} style={{
        height: 40,
      }}>
        <div style={{ margin: '0 auto', height: 32 }}>
          <Switch>
            <Route exact path="/registration" component={() => (
              <Link to={'/authorization'}>
                <div variant="contained" color="primary"
                  style={{ float: 'left', fontSize: '15px' }}
                  className='buttonHeaders'>
                  Authorization
                </div>
              </Link>)} />
            <Route exact path='/authorization' component={() => (
              < Link to={'/registration'}>
                <div variant="contained" color="primary"
                  style={{ float: 'left', fontSize: '15px' }}
                  className='buttonHeaders'>
                  Registration
                </div>
              </Link>)} />
            <Route component={() => (<><Link to={'/authorization'}>
              <div variant="contained" color="primary"
                style={{ float: 'left', fontSize: '15px' }}
                onClick={() => {
                  this.props.logOut()
                  this.props.clearStore()
                  localStorage.removeItem('token')
                }} className='buttonHeaders'>
                Log Out
                </div>
            </Link><Route exact path='/user/:name/board/:board' component={({ match }) => (
              <Link to={`/user/${match.params.name}`}>
                <div variant="contained" color="primary"
                  style={{ float: 'left', fontSize: '15px' }}
                  onClick={this.stopEditing}
                  className='buttonHeaders'>
                  {'Back'}
                </div>
              </Link>)} /></>)} />
          </Switch>
          <Route exact path='/user/:name' component={() => (
            <div key={`User with access ${this.props.user.name}`} style={{
              display: 'inline-block',
              cursor: 'pointer',
              backgroundColor: 'rgb(220, 220, 220)',
              float: 'right',
            }} className='headerUsers'>
              <div className='headerUsersHolder' />
              <div>
                {(this.props.user.name) ? this.props.user.name[0].toUpperCase() : null}
              </div></div>
          )} />
          <Route exact path='/user/:name/board/:boardId' component={() => (
            <div key={`User with access ${this.props.user.name}`} style={{
              display: 'inline-block',
              cursor: 'pointer',
              backgroundColor: 'rgb(220, 220, 220)',
              float: 'right',
            }} className='headerUsers'>
              <div className='headerUsersHolder' />
              <div>
                {this.props.user.name ? this.props.user.name[0].toUpperCase() : null}
              </div></div>
          )} />
          {editTitle}{editField}
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  editList: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
  notifications: state.notifications,
  user: state.user,
  todos: state.todos,
  lists: state.lists,
  state,
})

const mapDispatchToProps = (dispatch: Function) => ({
  editUser: editUser(dispatch),
  logOut: () => dispatch(logOut()),
  editList: editList(dispatch),
  addList: addList(dispatch),
  clearStore: clearStore(dispatch),
  removeNotification: removeNotification(dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
