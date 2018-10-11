// @flow

import React from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux'

import BoardSetsing from './List/BoardSetsing'
import editComponent from '../actions/components'
import TodosContainer from './List/TodosContainer';
import type { callEditUserParams } from '../actions/user'
import type { userProps, listsProps } from '../props'
import {
  tokenLogin,
  editUser,
} from '../actions/user'
import {
  editBoard,
  getBoard,
} from '../actions/boards'
import {
  addList,
  removeList,
  editList,
  getAllLists,
} from '../actions/lists'
import {
  removeToDo, editToDo,
} from '../actions/todos'
import {
  changeRoom,
} from '../socket'

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
  todos: Array<Object>,
  getAllLists: Function,
  editComponent: Function,
  boards: Array<Object>,
  components: Object,
  editBoard: Function,
  tokenLogin: Function,
  getBoard: Function,
};

type State = {
  lists: Array<Object>,
  moved: string,
  todos: Array<Object>,
  listMoved: boolean,
  ownPage: boolean,
}

class List extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = {
      lists: props.lists,
      moved: '',
      listMoved: false,
      todos: props.todos,
      ownPage: true,
    }
  }

  changeBoardPrivacy = (isPrivate) => {
    const boardId = `${this.props.history.location.pathname.split('/')[4]}`
    const currentBoard = this.props.boards.filter(obj => `${obj.id}` === boardId)[0]

    this.props.editBoard(currentBoard.id, { private: isPrivate })
  }

  changeBoardTitle = (title) => {
    const boardId = `${this.props.history.location.pathname.split('/')[4]}`
    const currentBoard = this.props.boards.filter(obj => `${obj.id}` === boardId)[0]

    this.props.editBoard(currentBoard.id, { title })
  }

  addAccessToUser = (user) => {
    const boardId = `${this.props.history.location.pathname.split('/')[4]}`
    const currentBoard = this.props.boards.filter(obj => `${obj.id}` === boardId)[0]

    const { usersWithAccess } = currentBoard
    usersWithAccess.push(user)
    this.props.editBoard(currentBoard.id, { usersWithAccess })
  }

  stopMoveList = () => {
    this.setState({
      listMoved: false,
    })
  }

  moveList = (dragIndex, hoverIndex) => {
    if (this.props.components.notOwnBoard) return
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
    if (this.props.components.notOwnBoard) return
    const oldList = this.state.lists.filter(elem => elem.id === oldListId)[0];
    const newList = this.state.lists.filter(elem => elem.id === newListId)[0];

    const index = oldList.todos.indexOf(todoId)
    oldList.todos.splice(index, 1)
    newList.todos.push(todoId)

    const newState = [oldList, newList]
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

  componentWillMount() { //eslint-disable-line
    if (localStorage.getItem('token') && !this.props.user.name) {
      this.props.tokenLogin()
    }
    const listId = this.props.history.location.pathname.split('/')[4]
    this.props.getBoard(listId)
    this.props.getAllLists(listId)
    changeRoom(listId)
  }

  addList = () => {
    if (this.props.components.notOwnBoard) return
    const listId = this.props.history.location.pathname.split('/')[4]
    this.props.addList(listId)
  }

  render() {
    const boardId = `${this.props.history.location.pathname.split('/')[4]}`
    const currentBoard = this.props.boards.filter(obj => `${obj.id}` === boardId)[0]
    if (!currentBoard) {
      return <div />
    }

    function add(a: number, b: Object) {
      return a + b.todos.length;
    }

    const { notOwnBoard } = this.props.components

    const propsTodosLength = this.props.lists.reduce(add, 0);
    const stateTodosLength = this.state.lists.reduce(add, 0);
    if (!this.state.listMoved) {
      this.state.lists.map((obj, i) => {
        let newState = []
        this.props.lists.map(list => newState.push(list))
        newState.sort((a, b) => {
          if (a.index > b.index) {
            return 1
          }
          return -1
        })
        if (this.state.lists[i].title !== newState[i].title) {
          newState = newState.map((list, index) => {
            const newObj = list
            newObj.index = index
            return newObj
          })

          this.setState({
            lists: newState,
          })
        }
        return null
      })
    }

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
      this.setState({
        lists: newState,
      })
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
      todos={this.props.todos}
      notOwnBoard={notOwnBoard}
    />)

    return <div style={{
      minWidth: '100%',
      height: 'calc(100vh - 68px)',
      paddingTop: 66,
      backgroundColor: currentBoard.color,
      overflowX: 'scroll',
    }}>
      <BoardSetsing
        notOwnBoard={notOwnBoard}
        board={currentBoard}
        changeBoardTitle={this.changeBoardTitle}
        changeBoardPrivacy={this.changeBoardPrivacy}
        addAccessToUser={this.addAccessToUser} />
      <div
        style={{
          display: 'flex',
          position: 'relative',
          paddingTop: 56,
        }}>
        {this.props.lists[0] ? allLists.map(obj => obj) : null}
        <div className='todosList'>
          <div className='addNewListContainer' onClick={this.addList}>
            <span>+ Add new list</span>
          </div>
        </div>
      </div>
    </div>
  }
}

List.propTypes = {
  addList: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  getAllLists: PropTypes.func,
  editComponent: PropTypes.func,
}

const mapStateToProps = state => ({
  state,
  boards: state.boards,
  lists: state.lists,
  todos: state.todos,
  user: state.user,
  components: state.components,
})

const mapDispatchToProps = (dispatch: Function) => ({
  addList: addList(dispatch),
  editBoard: editBoard(dispatch),
  removeList: removeList(dispatch),
  editUser: editUser(dispatch),
  editToDo: editToDo(dispatch),
  editList: editList(dispatch),
  removeToDo: removeToDo(dispatch),
  getAllLists: getAllLists(dispatch),
  tokenLogin: tokenLogin(dispatch),
  getBoard: getBoard(dispatch),
  editComponent: changes => dispatch(editComponent(changes)),
})

const ListWithContext = DragDropContext(HTML5Backend)(List)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListWithContext))
