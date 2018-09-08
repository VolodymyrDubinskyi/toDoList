import React from 'react';
import PropTypes from 'prop-types'
import { List } from '@material-ui/core'
import TodoItem from './TodoItem'

const ListComponentTodos = props => (<List>
  {props.listItems.map(todo => (
    <TodoItem
      todo={todo}
      key={`${todo.id}`}
      deleteTodo={props.deleteTodo}
      toggleChose={props.toggleChose}
      editTodoListValue={props.editTodoListValue}
    />
  ))}
</List>)

ListComponentTodos.defaultProps = {
  listItems: [],
}

ListComponentTodos.propTypes = {
  listItems: PropTypes.array.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleChose: PropTypes.func.isRequired,
  editTodoListValue: PropTypes.func.isRequired,
}

export default ListComponentTodos
