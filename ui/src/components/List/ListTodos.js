// @flow

import React from 'react';
import { connect } from 'react-redux'

import TodoItemWithConnect from './TodoItem'
import type { todoProps, listsProps } from '../../props'
import {
  removeToDo,
} from '../../actions/todos'

type Props = {
  listItems: Array<todoProps>,
  list: listsProps,
  changeList: Function,
  removeToDoInState: Function,
  moved: string,
  setMoveIndex: Function,
  stopMove: Function,
  userId: string,
  editToDo: Function,
}

type State = {
  listItems: Array<todoProps>,
}

class ListTodos extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = { listItems: props.listItems, moved: '' }
  }


  moveTodo = (hoverIndex, todoId) => {
    let newDragIndex = 0
    this.state.listItems.map((obj, index) => {
      if (obj.id === todoId) newDragIndex = index
      return null
    })
    const todos = this.state.listItems
    const dragCard = todos[newDragIndex]
    const newTodos = todos
    newTodos.splice(newDragIndex, 1)
    newTodos.splice(hoverIndex, 0, dragCard)
    newTodos.forEach((obj, i) => {
      const newObj = obj
      if (!obj) return null
      newObj.index = i
      return newObj
    })

    this.setState({
      listItems: newTodos,
    })
    this.props.setMoveIndex(todoId);
  }

  changeTodoIndexes = (listId, checkSameListId, id) => {
    const todos = this.state.listItems
    todos.sort((a, b) => {
      if (a.index > b.index) {
        return 1
      }
      return -1
    })
    todos.map((obj, index) => {
      if ((obj.id === id) && !checkSameListId) {
        return null
      }
      this.props.editToDo({
        listId,
        todoId: obj.id,
        changes: { index },
        userId: this.props.userId,
      })
      return null
    })
  }

  render() {
    if (this.state.listItems.length !== this.props.listItems.length) {
      this.setState({ listItems: this.props.listItems })
    }
    const { listItems } = this.state
    listItems.sort((a, b) => {
      if (a.index > b.index) {
        return 1
      }
      return -1
    })

    return <div>
      {listItems.map((todo) => {
        if (todo) {
          const moved = todo.id === this.props.moved
          return <TodoItemWithConnect
            todo={todo}
            key={`${todo.id}`}
            moveTodo={this.moveTodo}
            changeList={this.props.changeList}
            removeToDoInState={this.props.removeToDoInState}
            listId={this.props.list.id}
            moved={moved}
            stopMove={this.props.stopMove}
            listItems={listItems}
            changeTodoIndexes={this.changeTodoIndexes}
            editToDo={this.props.editToDo}
          />
        }
        return null
      })}
    </div>
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  removeToDo: removeToDo(dispatch),
})

const mapStateToProps = state => ({
  lists: state.lists,
  userId: state.user.id,
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTodos)
