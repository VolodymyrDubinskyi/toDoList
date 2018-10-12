import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  DragSource,
  DropTarget,
  DropTargetConnector,
} from 'react-dnd';
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import type { callRemoveToDoParams, callEditToDoParams } from '../../actions/todos'
import type { todoProps, userProps, listProps } from '../../props'
import TodoItemUsual from './TodoItemUsual'
import TodoItemEdit from './TodoItemEdit'
import {
  removeToDo, addToDo,
} from '../../actions/todos'
import {
  editList,
} from '../../actions/lists'
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

    props.moveTodo(hoverIndex, monitor.getItem().id, props.listId)

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
    if (props.notOwnBoard) return
    props.stopMove();
    setTimeout(() => {
      let newList;
      const { id } = props.todo
      props.lists.map((list) => {
        const findedTodoById = list.todos.filter(curListTodo => curListTodo === id);
        if (findedTodoById.length === 1) newList = list
        return null
      })
      const checkSameListId = newList.id === props.listId

      if (!checkSameListId) {
        const oldListTodosId = props.listItems.map(obj => obj.id)
        oldListTodosId.splice(oldListTodosId.indexOf(id), 1)

        props.removeToDo({ listId: props.listId, todoId: id })
        props.editList({
          id: newList.id,
          changes: { todos: [...newList.todos] },
        })
      }

      if (newList.id === props.listId) {
        props.changeTodoIndexes(newList.id, checkSameListId, id)
      } else {
        const list = props.lists.filter(elem => elem.id === newList.id)[0];
        list.todos.sort((a, b) => {
          if (a.index > b.index) {
            return 1
          }
          return -1
        })
        list.todos.map((obj, index) => {
          if ((obj.id === id) && !checkSameListId) {
            return null
          }
          props.editToDo({
            listId: newList.id || props.listId,
            todoId: obj.id,
            changes: { index },
            userId: props.userId,
          })
          return null
        })
      }
    }, 0)
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
  notOwnBoard: boolean,
};
type State = {
  todoNowEditting: boolean,
  editValue: Function,
  todo: todoProps,
}

export class TodoItem extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      todoNowEditting: false,
      editValue: props.todo.title,
      todo: props.todo,
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

  goToEdit = () => {
    if (this.props.notOwnBoard) return
    this.setState({ todoNowEditting: true })
  }

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
    const currentList = this.props.lists.filter(list => list.id === this.props.listId)[0];
    const currentTodo = currentList.todos.filter(todo => todo.id === this.props.todo.id)[0];
    let newTitle = this.props.todo.title
    if (currentTodo) {
      newTitle = currentTodo.title
    }

    const usual = (<TodoItemUsual
      todo={this.props.todo}
      title={newTitle}
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
        {this.props.connectDragSource(<div>
          {usual}
        </div>)}
      </div>
      </div>)
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  removeToDo: PropTypes.func.isRequired,
  listId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  editToDo: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userId: state.user.id,
  lists: state.lists,
})

const mapDispatchToProps = (dispatch: Function) => ({
  removeToDo: removeToDo(dispatch),
  addToDo: addToDo(dispatch),
  editList: editList(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  DragSource(itemTypes.TODO, todoSource, collect)(
    DropTarget(itemTypes.TODO, todoTarget, (connectDND: DropTargetConnector) => ({
      connectDropTarget: connectDND.dropTarget(),
    }))(TodoItem),
  ),
)
