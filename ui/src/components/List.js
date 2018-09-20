// @flow

import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

import { connect } from '../../react-myRedux'
import AddToDo from './List/AddToDo';
import HidingToggle from './List/HidingToggle';
import ListComponentTodos from './List/ListTodos'
import ListComponentLists from './List/ListLists'
import type { callEditUserParams } from '../actions/user'
import type { callEditListParams } from '../actions/lists'
import type { userProps, listsProps } from '../props'
import {
  editUser,
} from '../actions/user'
import {
  addList, removeList, editList,
} from '../actions/lists'
import {
  getAllToDos,
} from '../actions/todos'

type Props = {
  lists: Array<listsProps>,
  getAllToDos: (string) => void,
  user: userProps,
  history: Object,
  editUser: (callEditUserParams) => void,
  removeList: (string) => void,
  addList: Function,
  editList: (callEditListParams) => void,
};

type State = {
  todos: Array<Object>
}

class List extends React.Component<Props, State> {
  getTodos = (id) => {
    const getList = this.props.lists.filter(elem => elem.id === id);
    if (getList[0].todos.length === 0) {
      this.props.getAllToDos(id)
    }
  }

  render() {
    if (!this.props.user.name) {
      this.props.history.push('/authorization')
      return null
    }


    let list : {
      visibility: boolean,
      id: string,
      todos: Array<Object>,
    } = {
      visibility: false,
      id: '',
      todos: [{}],
    }
    if (this.props.user.currentList) {
      [list] = this.props.lists.filter(elem => elem.id === this.props.user.currentList)
    }

    if (this.props.history.location.pathname.split('/').length > 4 && !list) {
      this.props.history.push(`/user/${this.props.user.name}`)
    }

    return (
      <Switch>
        <Route exact path="/user/:id" component={() => <div className={'todosList'}>
          <p className={'todoListTitle'}>Todo List</p>
          <div className={'list clearfix'}>
            <HidingToggle
              visibility={this.props.user.visibility}
              editvisibility={() => {
                this.props.editUser({
                  name: this.props.user.name,
                  id: this.props.user.id,
                  changes: {
                    visibility: !this.props.user.visibility,
                  },
                })
              }}
            />
            <ListComponentLists
              user={this.props.user}
              lists={this.props.lists}
              getAllToDos={this.getTodos}
              addCurrentList={(id) => {
                this.props.editUser({
                  name: this.props.user.name,
                  id: this.props.user.id,
                  changes: { currentList: id },
                })
              }}
              deleteList={(id) => {
                this.props.removeList(id)
              }}
            />
            <Button style={{ fontSize: '12px' }}
              variant="contained" color="primary"
              onClick={this.props.addList}>
              {'Create new List'}
            </Button>
          </div></div>} />
        {(list) ? <Route exact path="/user/:id/list/:list" component={() => <div className={'todosList'}>
          <p className={'todoListTitle'}>Todo List</p>
          <div className={'list clearfix'}>
            <HidingToggle
              visibility={list.visibility}
              editvisibility={() => {
                this.props.editList({
                  id: list.id,
                  changes: { visibility: !list.visibility },
                })
              }} />
            <ListComponentTodos
              user={this.props.user}
              listItems={list.todos}
            />
            <AddToDo />
          </div>
        </div>} /> : <div />}
      </Switch>
    )
  }
}

List.propTypes = {
  addList: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  getAllToDos: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  lists: state.lists,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  addList: addList(dispatch),
  removeList: removeList(dispatch),
  editUser: editUser(dispatch),
  editList: editList(dispatch),
  getAllToDos: getAllToDos(dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
