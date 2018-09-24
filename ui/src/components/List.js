// @flow

import React from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { connect } from '../../react-myRedux'
import AddToDo from './List/AddToDo';
import HidingToggle from './List/HidingToggle';
import ListComponentTodos from './List/ListTodos'
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

    let allLists = []

    if (this.props.lists[0]) {
      allLists = this.props.lists.map(elem => <div className={'todosList'} key={elem.id}>
        <div className={'list clearfix'}>
          <HidingToggle
            list={elem}
            title={(elem.id) ? this.props.lists.filter(
              obj => obj.id === elem.id,
            )[0].title : null}
            visibility={elem.visibility}
            editvisibility={() => {
              this.props.editList({
                id: elem.id,
                changes: { visibility: !elem.visibility },
              })
            }} />
          <ListComponentTodos
            list={elem}
            getTodos={this.getTodos}
            user={this.props.user}
            listItems={elem.todos}
          />
          <AddToDo list={elem} />
        </div>
      </div>)
    }

    if (this.props.lists[0]) {
      return <div
        style={{
          width: '100vw',
          height: 'calc(100vh - 66px)',
          paddingTop: 66,
          display: 'flex',
          position: 'relative',
        }}>
        {allLists.map(obj => obj)}
      </div>
    }
    return <div />
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
