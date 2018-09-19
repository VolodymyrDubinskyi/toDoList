import React from 'react';
import PropTypes from 'prop-types'
import { connect } from '../../../react-myRedux'
import TodoItemUsual from './TodoItemUsual'
import TodoItemEdit from './TodoItemEdit'
import {
  removeToDo, editToDo,
} from '../../actions/todos'

export class TodoItem extends React.Component {
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
    this.props.removeToDo({
      userId: this.props.userId,
      listId: this.props.listId,
      todoId: this.props.todo.id,
    })
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

  saveAndStopEdditingUsingEnter = (e) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)
