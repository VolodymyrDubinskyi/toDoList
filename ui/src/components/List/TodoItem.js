import React from 'react';
import PropTypes from 'prop-types'
import TodoItemUsual from './TodoItemUsual'
import TodoItemEdit from './TodoItemEdit'

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoNowEditting: false,
      editValue: props.todo.title,
    };
  }

  updateEditValue = (e) => {
    this.setState({
      editValue: e.target.value,
    });
  }

  deleteTodo = () => {
    this.props.deleteTodo(this.props.todo.id)
  }

  toggleChose = () => this.props.toggleChose(this.props.todo.id)

  goToEdit = () => this.setState({ todoNowEditting: true })

  saveAndStopEdditingUsingEnter = (e) => {
    if (e.keyCode === 13) {
      this.saveAndStopEditing()
    }
  }

  stopEditing = () => this.setState({ todoNowEditting: false, editValue: this.props.todo.title })

  saveAndStopEditing = () => {
    this.props.editTodoListValue(this.props.todo.id, this.state.editValue)
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
  deleteTodo: PropTypes.func.isRequired,
  toggleChose: PropTypes.func.isRequired,
  editTodoListValue: PropTypes.func.isRequired,
}
