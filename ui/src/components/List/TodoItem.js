// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  DragSource,
  DropTarget,
  DropTargetConnector,
} from 'react-dnd';
import { findDOMNode } from 'react-dom'

import type { callRemoveToDoParams, callEditToDoParams } from '../../actions/todos'
import type { todoProps, userProps } from '../../props'
import { connect } from '../../../react-myRedux'
import TodoItemUsual from './TodoItemUsual'
import TodoItemEdit from './TodoItemEdit'
import {
  removeToDo, editToDo,
} from '../../actions/todos'
import itemTypes from '../../ItemTypes'


const todoTarget = {
  hover(props, monitor, component) {
    // const dragIndex = monitor.getItem().index
    // const hoverIndex = props.elem.index

    // if (dragIndex === hoverIndex) {
    //   return
    // }

    // // $FlowFixMe
    // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect() //eslint-disable-line
    // const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
    // const clientOffset = monitor.getClientOffset()
    // const hoverClientX = clientOffset.x - hoverBoundingRect.left

    // if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
    //   return
    // }
    // if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
    //   return
    // }

    // props.moveCard(dragIndex, hoverIndex)

    // monitor.getItem().index = hoverIndex //eslint-disable-line
  },
}

const todoSource = {
  beginDrag(props) {
    return {
      id: props.todo.id,
      index: props.todo.index,
      listId: props.listId,
    };
  },
  // endDrag(props: Object) {
  //   props.lists.map((obj) => {
  //     props.editList({ id: obj.id, changes: { index: obj.index } })
  //     return null
  //   })
  // },
};

function collect(connectDND, monitor) {
  return {
    connectDragSource: connectDND.dragSource(),
    connectDragPreview: connectDND.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

type Props = {
  value: number,
  user: userProps,
  removeToDo: (callRemoveToDoParams) => void,
  userId: string,
  listId: string,
  todo: todoProps,
  editToDo: (callEditToDoParams) => void,
};
type State = {
  todoNowEditting: boolean,
  editValue: Function,
}

export class TodoItem extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      todoNowEditting: false,
      editValue: props.todo.title,
    };
  }

  updateEditValue = (e: Object) => {
    this.setState({
      editValue: e.target.value,
    });
    return null
  }

  deleteTodo = () => {
    const removeParams: callRemoveToDoParams = {
      userId: this.props.userId,
      listId: this.props.listId,
      todoId: this.props.todo.id,
    }
    this.props.removeToDo(removeParams)
  }

  toggleChose = () => {
    this.props.editToDo({
      listId: this.props.listId,
      todoId: this.props.todo.id,
      changes: { chosen: !this.props.todo.chosen },
      userId: this.props.userId,
    })
  }

  goToEdit = () => this.setState({ todoNowEditting: true })

  saveAndStopEdditingUsingEnter = (e: Object) => {
    if (e.keyCode === 13) {
      this.saveAndStopEdditing()
    }
  }

  stopEditing = () => this.setState({ todoNowEditting: false })

  saveAndStopEdditing = () => {
    this.props.editToDo({
      listId: this.props.listId,
      todoId: this.props.todo.id,
      changes: { value: this.state.editValue },
      userId: this.props.userId,
    })
    this.stopEditing()
  }

  render() {
    const usual = (<TodoItemUsual
      todo={this.props.todo}
      toggleChose={this.toggleChose}
      goToEdit={this.goToEdit}
      deleteTodo={this.deleteTodo}
    />)

    const edit = (this.state.todoNowEditting) ? (<TodoItemEdit
      saveAndStopEdditingUsingEnter={this.saveAndStopEdditingUsingEnter}
      saveAndStopEdditing={this.saveAndStopEdditing}
      updateEditValue={this.updateEditValue}
      stopEditing={this.stopEditing}
      todo={this.props.todo}
      editValue={this.state.editValue} />) : null

    return <div style={{ fontFamily: 'Helvetica Neue,Arial,Helvetica,sans-serif' }}>{edit}{usual}</div>
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  removeToDo: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  editToDo: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userId: state.user.id,
})

const mapDispatchToProps = dispatch => ({
  removeToDo: removeToDo(dispatch),
  editToDo: editToDo(dispatch),
})


export default DragSource(itemTypes.LIST, todoSource, collect)(
  DropTarget(itemTypes.LIST, todoTarget, (connectDND: DropTargetConnector) => ({
    connectDropTarget: connectDND.dropTarget(),
  }))(connect(mapStateToProps, mapDispatchToProps)(TodoItem)),
)

// export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)
