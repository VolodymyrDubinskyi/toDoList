import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TodoItemUsual from './TodoItemUsual'
import TodoItemEdit from './TodoItemEdit'
import {
  removeToDo, editToDo,
} from '../../actions/actions'

class TodoItem extends React.Component {
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
    this.props.removeToDo(this.props.listId, this.props.todo.id)
  }

  toggleChose = () => {
    this.props.editToDo(this.props.listId, this.props.todo.id, { chosen: !this.props.todo.chosen })
  }

  goToEdit = () => this.setState({ todoNowEditting: true })

  saveAndStopEdditingUsingEnter = (e) => {
    if (e.keyCode === 13) {
      this.saveAndStopEditing()
    }
  }

  stopEditing = () => this.setState({ todoNowEditting: false })

  saveAndStopEditing = () => {
    this.props.editToDo(this.props.listId, this.props.todo.id, { title: this.state.editValue })
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
  listId: PropTypes.number.isRequired,
  editToDo: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  listId: state.user.currentList,
})

const mapDispatchToProps = dispatch => ({
  removeToDo: (listId, todoId) => dispatch(removeToDo(listId, todoId)),
  editToDo: (listId, todoId, changes) => dispatch(editToDo(listId, todoId, changes)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)
