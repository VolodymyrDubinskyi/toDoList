import React from 'react';
import PropTypes from 'prop-types'
import { List } from '@material-ui/core'
import TodoItemWithConnect from './TodoItem'

const ListComponentTodos = props => (<List>
  {props.listItems.map(todo => <TodoItemWithConnect
    todo={todo}
    key={`${todo.id}`}
  />)}
</List>)

ListComponentTodos.defaultProps = {
  listItems: [],
}

ListComponentTodos.propTypes = {
  listItems: PropTypes.array.isRequired,
}

export default ListComponentTodos
