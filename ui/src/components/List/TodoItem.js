// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import type { callRemoveToDoParams, callEditToDoParams } from '../../actions/todos'
import type { todoProps, userProps } from '../../props'
import { connect } from '../../../react-myRedux'
import TodoItemUsual from './TodoItemUsual'
import TodoItemEdit from './TodoItemEdit'
import {
  removeToDo, editToDo,
} from '../../actions/todos'


type Props = {
  value: number,
  user: userProps,
  removeToDo: (callRemoveToDoParams) => void,
  userId: string,
  listId: string,
  todo: todoProps,
  editToDo: (callEditToDoParams) => void,
  history: Object,
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

  saveAndStopEdditingUsingEnter = (e :Object) => {
    if (e.keyCode === 13) {
      this.saveAndStopEditing()
    }
  }

  stopEditing = () => this.setState({ todoNowEditting: false })

  saveAndStopEditing = () => {
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
      deleteTodo={this.deleteTodo} />)

    const edit = (<TodoItemEdit
      saveAndStopEdditingUsingEnter={this.saveAndStopEdditingUsingEnter}
      saveAndStopEditing={this.saveAndStopEditing}
      updateEditValue={this.updateEditValue}
      stopEditing={this.stopEditing}
      todo={this.props.todo}
      editValue={this.state.editValue} />)

    const todo = (this.state.todoNowEditting) ? edit : usual

    return todo
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  removeToDo: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  editToDo: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  listId: state.user.currentList,
  userId: state.user.id,
})

const mapDispatchToProps = dispatch => ({
  removeToDo: removeToDo(dispatch),
  editToDo: editToDo(dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoItem))
