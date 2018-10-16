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
import { editList, addList, getAllLists } from '../actions/lists'
import logOut, { editUser, clearStore, clearListsAndTodos } from '../actions/user'
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
  boards: Array<Object>,
  clearListsAndTodos: Function,
  getAllLists: Function,
};
type State = {
  titleEdit: boolean,
  editValue: string,
  isUserSettsingsOpen: boolean,
  boardListOpened: boolean,
  inputFilterValue: string,
}

export class Header extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      titleEdit: false,
      editValue: '',
      isUserSettsingsOpen: false,
      boardListOpened: false,
      inputFilterValue: '',
    };
  }

  openBoardsList = () => {
    this.setState({ boardListOpened: true })
    document.addEventListener('click', this.closeBoardsList)
  }

  closeBoardsList = (e: Object) => {
    if (e) {
      const { target } = e
      if (target.className.indexOf('dialogBox') === -1) {
        this.setState({ boardListOpened: false })
        document.removeEventListener('click', this.closeBoardsList)
      }
    } else {
      this.setState({ boardListOpened: false })
      document.removeEventListener('click', this.closeBoardsList)
    }
  }

  openUserSettsings = () => {
    this.setState({ isUserSettsingsOpen: true })
    document.addEventListener('click', this.closeUserSettsings)
  }

  closeUserSettsings = (e: Object) => {
    if (e) {
      const { target } = e
      if (target.className.indexOf('dialogBox') === -1) {
        this.setState({ isUserSettsingsOpen: false })
        document.removeEventListener('click', this.closeUserSettsings)
      }
    } else {
      this.setState({ isUserSettsingsOpen: false })
      document.removeEventListener('click', this.closeUserSettsings)
    }
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


  updateInputFilterValue = (e: Object) => {
    this.setState({
      inputFilterValue: e.target.value,
    });
  }


  goToBoard = (id: string) => {
    this.props.history.push(`/user/${this.props.user.name}/board/${id}`)
    const listId = this.props.history.location.pathname.split('/')[4]
    this.props.clearListsAndTodos();
    this.props.getAllLists(listId)
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

    const userAvatar = <div key={`User with access ${this.props.user.name}`} style={{
      display: 'inline-block',
      cursor: 'pointer',
      backgroundColor: 'rgb(220, 220, 220)',
      float: 'right',
    }} onClick={this.openUserSettsings}
      className='headerUsers'>
      <div className='headerUsersHolder' />
      <div>
        {(this.props.user.name) ? this.props.user.name[0].toUpperCase() : <img
          src={'/anon.png'} alt="Not authorized user" className='avatarImage' />}
      </div>
      {this.state.isUserSettsingsOpen ? <div
        className='dialogBox'
        style={{
          position: 'absolute',
          right: -4,
          top: 40,
          zIndex: 16,
          width: 280,
          padding: 12,
          backgroundColor: 'white',
          color: '#6b808c',
          fontFamily: 'Helvetica Neue,Arial,Helvetica,sans-serif',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
        }}>
        <div style={{
          borderBottom: '1px solid rgba(9,45,66,.13)',
          paddingBottom: 8,
          textAlign: 'center',
        }} className='dialogBox'>{`${this.props.user.name} (id${this.props.user.id})`}</div>
        <div style={{
          position: 'absolute',
          top: 10,
          right: 12,
          cursor: 'pointer',
        }}>x</div>
        <div className='userSettsingsButton'>
          <Link to={`/profile/${this.props.user.name}`}>
            <div>Profile</div>
          </Link>
          <Link to={'/authorization'}>
            <div onClick={() => {
              this.props.logOut()
              this.props.clearStore()
              localStorage.removeItem('token')
            }}>Exit</div>
          </Link>
        </div>
      </div> : null}
    </div>

    const listOfBoards = this.props.boards.map((board) => {
      if (board.title.indexOf(this.state.inputFilterValue) !== -1 || this.state.inputFilterValue === '') {
        return <div key={`boards list ${board.id}`}
          style={{
            margin: 2,
          }}>
          <div className='clearfix' style={{
            backgroundColor: board.color,
          }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}
              onClick={() => { this.goToBoard(board.id) }}>
              <div style={{
                width: 36,
                height: 36,
                float: 'left',
                backgroundColor: board.color,
                display: 'inline-block',
              }} />
              <div style={{
                height: 36,
                position: 'relative',
              }}>
                <div className='listsOfBoardHolder' />
                <div style={{
                  display: 'inline-block',
                  fontFamily: '"Helvetica Neue", Arial, Helvetica, sans-serif',
                  fontSize: 14,
                  paddingLeft: 10,
                  lineHeight: '36px',
                  fontWeight: 700,
                }}>
                  {board.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      return null
    })

    return (
      <div className={'header'} style={(this.props.history.location.pathname.split('/')[4] !== undefined) ? {
        height: 40,
      } : { height: 40, backgroundColor: '#026aa7' }}>
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
            </Link><Route exact path='/user/:name/board/:board' component={({ match }) => (<div>
              <Link to={`/user/${match.params.name}`}>
                <div variant="contained" color="primary"
                  style={{ float: 'left', fontSize: '15px' }}
                  onClick={this.stopEditing}
                  className='buttonHeaders'>
                  {'Back'}
                </div>
              </Link>
              <div variant="contained" color="primary"
                style={{ float: 'left', fontSize: '15px', cursor: 'pointer' }}
                onClick={this.openBoardsList}
                className='buttonHeaders'>
                {'Boards'}

                {this.state.boardListOpened ? <div
                  className='dialogBox'
                  style={{
                    position: 'absolute',
                    left: -4,
                    top: 40,
                    zIndex: 16,
                    width: 280,
                    padding: 12,
                    backgroundColor: 'white',
                    color: '#6b808c',
                    fontFamily: 'Helvetica Neue,Arial,Helvetica,sans-serif',
                    fontSize: 14,
                    lineHeight: '20px',
                    fontWeight: 400,
                  }}>
                  <div style={{
                    borderBottom: '1px solid rgba(9,45,66,.13)',
                    paddingBottom: 8,
                    textAlign: 'center',
                  }} className='dialogBox'>{`${this.props.user.name} (id${this.props.user.id})`}</div>
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 12,
                    cursor: 'pointer',
                  }}>x</div>
                  <input
                    value={this.state.inputFilterValue}
                    placeholder='Add filter'
                    className='boardListFilter dialogBox'
                    onChange={this.updateInputFilterValue} autoFocus />
                  {listOfBoards}
                </div> : null}
              </div></div>)} /><Route exact path='/profile/:name' component={({ match }) => (<div>
                <Link to={`/user/${match.params.name}`}>
                  <div variant="contained" color="primary"
                    style={{ float: 'left', fontSize: '15px' }}
                    onClick={this.stopEditing}
                    className='buttonHeaders'>
                    {'Back'}
                  </div>
                </Link>
                <div variant="contained" color="primary"
                  style={{ float: 'left', fontSize: '15px', cursor: 'pointer' }}
                  onClick={this.openBoardsList}
                  className='buttonHeaders'>
                  {'Boards'}

                  {this.state.boardListOpened ? <div
                    className='dialogBox'
                    style={{
                      position: 'absolute',
                      left: -4,
                      top: 40,
                      zIndex: 16,
                      width: 280,
                      padding: 12,
                      backgroundColor: 'white',
                      color: '#6b808c',
                      fontFamily: 'Helvetica Neue,Arial,Helvetica,sans-serif',
                      fontSize: 14,
                      lineHeight: '20px',
                      fontWeight: 400,
                    }}>
                    <div style={{
                      borderBottom: '1px solid rgba(9,45,66,.13)',
                      paddingBottom: 8,
                      textAlign: 'center',
                    }} className='dialogBox'>{`${this.props.user.name} (id${this.props.user.id})`}</div>
                    <div style={{
                      position: 'absolute',
                      top: 10,
                      right: 12,
                      cursor: 'pointer',
                    }}>x</div>

                    <input
                      value={this.state.inputFilterValue}
                      placeholder='Add filter'
                      className='boardListFilter dialogBox'
                      onChange={this.updateInputFilterValue} autoFocus />

                    {listOfBoards}
                  </div> : null}

                </div></div>)} /></>)} />
          </Switch>
          <Route exact path='/user/:name' component={() => (userAvatar)} />
          <Route exact path='/profile/:name' component={() => (userAvatar)} />
          <Route exact path='/user/:name/board/:boardId' component={() => (userAvatar)} />
          {editTitle}{editField}
        </div>
        <img src={'/trello.png'} alt={'Trello ico'} style={{
          position: 'absolute',
          left: 'calc(50% - 40px)',
          top: 5,
          opacity: 0.5,
        }} />
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
  clearListsAndTodos: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  notifications: state.notifications,
  user: state.user,
  todos: state.todos,
  lists: state.lists,
  boards: state.boards,
  state,
})

const mapDispatchToProps = (dispatch: Function) => ({
  editUser: editUser(dispatch),
  logOut: () => dispatch(logOut()),
  editList: editList(dispatch),
  addList: addList(dispatch),
  clearStore: clearStore(dispatch),
  removeNotification: removeNotification(dispatch),
  clearListsAndTodos: () => dispatch(clearListsAndTodos()),
  getAllLists: getAllLists(dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
