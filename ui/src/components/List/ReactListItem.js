import React from 'react';
import PropTypes from 'prop-types'
import {
  ListItem, ListItemText,
} from '@material-ui/core'
import ReactListItemUsual from './ReactListItemUsual'
import ReactListItemEdit from './ReactListItemEdit'

export default class ReactListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoNowEditting: false,
    };
    this.state = {
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
    const usual = (<ReactListItemUsual
      todo={this.props.todo}
      toggleChose={this.toggleChose}
      goToEdit={this.goToEdit}
      deleteTodo={this.deleteTodo} />)

    const edit = (<ReactListItemEdit
      saveAndStopEdditingUsingEnter={this.saveAndStopEdditingUsingEnter}
      saveAndStopEditing={this.saveAndStopEditing}
      updateEditValue={this.updateEditValue}
      stopEditing={this.stopEditing}
      editValue={this.state.editValue} />)

    const todo = (this.state.todoNowEditting) ? edit : usual

    return (
      <ListItem key={this.props.todo.title}
        style={{
          padding: 0,
          margin: 0,
        }}
        role={undefined}
        dense
        button>
        <ListItemText style={{
          fontSize: '1em',
        }}>
          {todo}
        </ListItemText>
      </ListItem>)
  }
}

ReactListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleChose: PropTypes.func.isRequired,
  editTodoListValue: PropTypes.func.isRequired,
}
