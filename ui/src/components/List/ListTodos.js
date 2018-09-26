// @flow

import React from 'react';
import PropTypes from 'prop-types'
import {
  DropTarget,
  DropTargetConnector,
} from 'react-dnd';

import TodoItemWithConnect from './TodoItem'
import type { todoProps, listsProps } from '../../props'
import { connect } from '../../../react-myRedux'
import itemTypes from '../../ItemTypes'


type Props = {
  listItems: Array<todoProps>,
  list: listsProps,
  connectDropTarget: Function,
}

type State = {
  listItems: Array<todoProps>,
}


const todoTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.todo.index

    if (dragIndex === hoverIndex) {
      return
    }

    if (monitor.getItem().listId !== props.listId) {
      return
    }

    // $FlowFixMe
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect() //eslint-disable-line
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.moveTodo(dragIndex, hoverIndex)

    monitor.getItem().index = hoverIndex //eslint-disable-line
  },
}

class ListTodos extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = { listItems: props.listItems }
  }

  moveTodo = (dragIndex: number, hoverIndex: number) => {
    const todos = this.state.listItems
    const dragCard = todos[dragIndex]

    const newTodos = todos
    newTodos.splice(dragIndex, 1)
    newTodos.splice(hoverIndex, 0, dragCard)
    newTodos.forEach((obj, i) => {
      const newObj = obj
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
        if (todo.id) {
          return <TodoItemWithConnect
            todo={todo}
            key={`${todo.id}`}
            moveTodo={this.moveTodo}
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

export default connect(() => { }, () => { })(ListTodos)
