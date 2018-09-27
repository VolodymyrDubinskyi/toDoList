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
}

class ListTodos extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = { listItems: props.listItems }
  }

  moveTodo = (dragIndex, hoverIndex) => {
    const todos = this.state.listItems
    const dragCard = todos[dragIndex]

    const newTodos = todos
    newTodos.splice(dragIndex, 1)
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
  }

  render() {
    if (this.state.listItems !== this.props.listItems) {
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
          return <TodoItemWithConnect
            todo={todo}
            key={`${todo.id}`}
            moveTodo={this.moveTodo}
            changeList={this.props.changeList}
            removeToDoInState={this.props.removeToDoInState}
            listId={this.props.list.id}
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
