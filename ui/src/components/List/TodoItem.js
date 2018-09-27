// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  DragSource,
  DropTarget,
  DropTargetConnector,
} from 'react-dnd';
import { findDOMNode } from 'react-dom'
import { getEmptyImage } from 'react-dnd-html5-backend'

import type { callRemoveToDoParams, callEditToDoParams } from '../../actions/todos'
import type { todoProps, userProps, listProps } from '../../props'
import { connect } from '../../../react-myRedux'
import TodoItemUsual from './TodoItemUsual'
import TodoItemEdit from './TodoItemEdit'
import {
  removeToDo, editToDo, addToDo,
} from '../../actions/todos'
import itemTypes from '../../ItemTypes'


const todoTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.todo.index

    if (dragIndex === hoverIndex) {
      return
    }

    if (monitor.getItem().listId !== props.listId) {
      props.changeList(monitor.getItem().id, monitor.getItem().listId, props.listId)
      monitor.getItem().listId = props.listId //eslint-disable-line
      props.lists.map((obj) => {
        obj.todos.map((todo) => {
          if (todo.id === monitor.getItem().id) monitor.getItem().index = todo.index//eslint-disable-line
          return null
        })
        return null
      })
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

    props.moveTodo(hoverIndex, monitor.getItem().id)

    monitor.getItem().index = hoverIndex //eslint-disable-line
  },
}

const todoSource = {
  beginDrag(props) {
    return {
      id: props.todo.id,
      index: props.todo.index,
      listId: props.listId,
      userId: props.userId,
    };
  },
  endDrag(props) {
    props.stopMove();
    let newListId;
    const { id } = props.todo
    props.lists.map((list) => {
      const findedTodoById = list.todos.filter(curListTodo => curListTodo.id === id);
      if (findedTodoById.length === 1) newListId = list.id
      return null
    })
    const checkSameListId = newListId === props.listId

    if (!checkSameListId) {
      const removeParams: callRemoveToDoParams = {
        userId: props.userId,
        listId: props.listId,
        todoId: props.todo.id,
      }
      props.removeToDo(removeParams)
      const index = props.removeToDoInState(newListId,
        props.listId, props.todo.id, props.todo.title)
      props.addToDo({ listId: newListId, value: props.todo.title, index })
    }

    const list = props.lists.filter(elem => elem.id === newListId)[0];
    list.todos.map((obj, index) => {
      if ((obj.id === id) && !checkSameListId) {
        return null
      }
      props.editToDo({
        listId: newListId || props.listId,
        todoId: obj.id,
        changes: { index },
        userId: props.userId,
      })
      return null
    })
  },
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
  connectDropTarget: Function,
  connectDragSource: Function,
  lists: Array<listProps>,
  isDragging: boolean,
  moved: boolean,
  stopMove: Function,
  connectDragPreview: Function,
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
    const moved = this.props.moved || this.props.isDragging

    return this.props.connectDropTarget(<div
      style={{ fontFamily: 'Helvetica Neue,Arial,Helvetica,sans-serif', position: 'relative' }}
    >{moved ? <div className='draggingTodoHolder' /> : null}<div
      style={moved ? { opacity: 0 } : {}}>
        {edit}
        {this.props.connectDragSource(<div>{usual}</div>)}
      </div></div>)
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
  lists: state.lists,
})

const mapDispatchToProps = dispatch => ({
  removeToDo: removeToDo(dispatch),
  editToDo: editToDo(dispatch),
  addToDo: addToDo(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  DragSource(itemTypes.TODO, todoSource, collect)(
    DropTarget(itemTypes.TODO, todoTarget, (connectDND: DropTargetConnector) => ({
      connectDropTarget: connectDND.dropTarget(),
    }))(TodoItem),
  ),
)
