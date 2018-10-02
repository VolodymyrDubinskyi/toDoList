// @flow

import React from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux'

import TodosContainer from './List/TodosContainer';
import type { callEditUserParams } from '../actions/user'
import type { userProps, listsProps } from '../props'
import {
  editUser,
} from '../actions/user'
import {
  addList, removeList, editList,
} from '../actions/lists'
import {
  removeToDo, editToDo,
} from '../actions/todos'

type Props = {
  lists: Array<listsProps>,
  user: userProps,
  history: Object,
  editUser: (callEditUserParams) => void,
  removeList: (string) => void,
  addList: Function,
  removeToDo: Function,
  editToDo: Function,
  editList: Function,
};

type State = {
  lists: Array<Object>,
  moved: string,
  listMoved: boolean,
}

class List extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = { lists: props.lists, moved: '', listMoved: false }
  }

  stopMoveList = () => {
    this.setState({
      listMoved: false,
    })
  }

  moveList = (dragIndex, hoverIndex) => {
    const { lists } = this.state
    const dragCard = lists[dragIndex]

    const newLists = lists
    newLists.splice(dragIndex, 1)
    newLists.splice(hoverIndex, 0, dragCard)
    newLists.forEach((obj, i) => {
      const newObj = obj
      newObj.index = i
      return newObj
    })
    this.setState({
      lists: newLists,
      listMoved: true,
    })
  }

  changeList = (todoId, oldListId, newListId) => {
    const lists = this.state.lists.filter((elem) => {
      const filter = (elem.id !== oldListId) && (elem.id !== newListId)
      return filter
    });
    const oldList = this.state.lists.filter(elem => elem.id === oldListId)[0];
    const newList = this.state.lists.filter(elem => elem.id === newListId)[0];

    let oldListTodos = oldList.todos
    const newListTodos = newList.todos
    const currentTodo = oldListTodos.filter(elem => elem.id === todoId)[0];

    if (currentTodo === undefined) return

    oldListTodos = oldListTodos.filter(elem => elem.id !== todoId);
    newListTodos.push(currentTodo)
    newListTodos.forEach((obj, i) => {
      const newObj = obj
      newObj.index = i
      return newObj
    })
    newListTodos.forEach((obj, index) => {
      const newObj = obj
      newObj.index = index
      return newObj
    })
    newListTodos.sort((a, b) => {
      if (a.index > b.index) {
        return 1
      }
      return -1
    })
    newList.todos = newListTodos
    oldList.todos = oldListTodos

    const newState = [oldList, newList, ...lists]
    newState.sort((a, b) => {
      if (a.index > b.index) {
        return 1
      }
      return -1
    })
    this.setState({
      lists: newState,
    })
  }

  removeToDoInState = (newListId, oldListId, oldId, title) => {
    const newList = this.props.lists.filter(list => list.id === newListId)[0];
    const listTodos = newList.todos.filter(todo => todo.title === title);
    const oldTodo = listTodos.filter(todo => todo.id === oldId)[0]
    const removeParams = {
      userId: this.props.user.id,
      listId: newList.id,
      todoId: oldTodo.id,
    }
    this.props.removeToDo(removeParams)
    return oldTodo.index
  }

  stopMove = () => {
    this.setState({
      moved: '',
    })
    const newState = []
    this.props.lists.map(obj => newState.push(obj))
    newState.sort((a, b) => {
      if (a.index > b.index) {
        return 1
      }
      return -1
    })
    this.setState({ lists: newState })
  }

  setMoveIndex = (id) => {
    this.setState({
      moved: id,
    })
  }

  render() {
    // for (let i = 0; i < this.props.lists.length; i++) {
    //   console.log(this.props.lists[i])
    // }
    if (!this.state.listMoved) {
      let indexSame = true
      this.state.lists.map((obj, i) => {
        if (this.state.lists[i].index !== this.props.lists[i].index) {
          indexSame = false
        }
        return null
      })
      if (!indexSame) {
        const lists = this.props.lists.sort((a, b) => {
          if (a.index > b.index) {
            return 1
          }
          return -1
        })
        this.setState({
          lists,
        })
      }
    }
    if (!this.props.user.name) {
      this.props.history.push('/authorization')
      return null
    }

    function add(a: number, b: Object) {
      return a + b.todos.length;
    }

    const propsTodosLength = this.props.lists.reduce(add, 0);
    const stateTodosLength = this.state.lists.reduce(add, 0);

    if ((propsTodosLength !== stateTodosLength)
      || (this.props.lists.length !== this.state.lists.length)) {
      const newState = []
      this.props.lists.map(obj => newState.push(obj))
      newState.sort((a, b) => {
        if (a.index > b.index) {
          return 1
        }
        return -1
      })
      this.setState({ lists: newState })
    }

    const allLists = this.state.lists.map(elem => <TodosContainer
      key={elem.id}
      elem={elem}
      list={elem}
      user={this.props.user}
      listItems={elem.todos}
      lists={this.state.lists}
      moveList={this.moveList}
      changeList={this.changeList}
      removeToDoInState={this.removeToDoInState}
      moved={this.state.moved}
      stopMove={this.stopMove}
      setMoveIndex={this.setMoveIndex}
      editToDo={this.props.editToDo}
      editList={this.props.editList}
      stopMoveList={this.stopMoveList}
    />)

    if (this.props.lists[0]) {
      return <div
        style={{
          width: '100vw',
          height: 'calc(100vh - 68px)',
          paddingTop: 68,
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
  history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  state,
  lists: state.lists,
  user: state.user,
})

const mapDispatchToProps = (dispatch: Function) => ({
  addList: addList(dispatch),
  removeList: removeList(dispatch),
  editUser: editUser(dispatch),
  editToDo: editToDo(dispatch),
  editList: editList(dispatch),
  removeToDo: removeToDo(dispatch),
})

const ListWithContext = DragDropContext(HTML5Backend)(List)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListWithContext))
