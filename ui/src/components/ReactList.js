import React from 'react';
import PropTypes from 'prop-types'
import ReactAddToDoComponent from './List/ReactAddToDoComponent';
import ReactHidingToggle from './List/ReactHidingToggle';
import ReactListComponentTodos from './List/ReactListComponentTodos'
// import ReactListsListItem from './List/ReactListsListItem'

export default class ReactToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  createTodo = (newToDo) => {
    const newTodos = [...this.state.todos, newToDo]
    this.setState({
      todos: newTodos,
    })
  }

  deleteTodo = (id) => {
    const newTodos = this.state.todos.filter(todo => todo.id !== id)
    this.setState({
      todos: newTodos,
    })
  }

  toggleChose = (id) => {
    const newTodos = [...this.state.todos]
    newTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.chosen = !todo.chosen
      }
    })
    this.setState({
      todos: newTodos,
    })
  }

  editTodoListValue = (id, newTitle) => {
    const newTodos = [...this.state.todos]
    newTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.title = newTitle
      }
    })
    this.setState({
      todos: newTodos,
    })
  }

  changeVisibility = () => {
    console.log('changeVisibility')
  }

  render() {
    return (
      <div className={'todoList'}>
        <p className={'todoListTitle'}>Todo List</p>
        <div className={'list clearfix'}>
          <ReactHidingToggle user={this.props.user}
            changeVisibility={this.changeVisibility}
            changeUserVisibility={this.props.changeUserVisibility} />
          <ReactListComponentTodos
            listType={this.props.listType}
            listItems={this.state.todos}
            deleteTodo={this.deleteTodo}
            toggleChose={this.toggleChose}
            editTodoListValue={this.editTodoListValue} />
          <ReactAddToDoComponent createTodo={this.createTodo} />
        </div>
      </div>)
  }
}

ReactToDoList.propTypes = {
  changeUserVisibility: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  listType: PropTypes.string.isRequired,
}
