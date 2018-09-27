// @flow

import React from 'react';
import PropTypes from 'prop-types'

import TodoItemWithConnect from './TodoItem'
import type { todoProps, listsProps } from '../../props'
import { connect } from '../../../react-myRedux'
import {
  removeToDo, editToDo,
} from '../../actions/todos'

type Props = {
  listItems: Array<todoProps>,
  list: listsProps,
  connectDropTarget: Function,
  changeList: Function,
  removeToDoInState: Function,
}

type State = {
  listItems: Array<todoProps>,
  moved: string,
}

class ListTodos extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = { listItems: props.listItems, moved: '' }
  }

  stopMove = () => {
    this.setState({
      moved: '',
    })
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
      moved: todoId,
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
          const moved = todo.id === this.state.moved
          return <TodoItemWithConnect
            todo={todo}
            key={`${todo.id}`}
            moveTodo={this.moveTodo}
            changeList={this.props.changeList}
            removeToDoInState={this.props.removeToDoInState}
            listId={this.props.list.id}
            moved={moved}
            stopMove={this.stopMove}
          />
        }
        return null
      })}
    </div>
  }
}

ListTodos.propTypes = {
  listItems: PropTypes.array.isRequired,
}

const mapDispatchToProps = dispatch => ({
  removeToDo: removeToDo(dispatch),
  editToDo: editToDo(dispatch),
})

const mapStateToProps = state => ({
  userId: state.user.id,
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTodos)
