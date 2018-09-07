import React from 'react';
import PropTypes from 'prop-types'
import { List } from '@material-ui/core'
import ReactListItem from './ReactListItem'

const ReactListComponentTodos = props => (<List>
  {props.listItems.map(todo => (
    <ReactListItem
      todo={todo}
      key={`${todo.id}`}
      deleteTodo={props.deleteTodo}
      toggleChose={props.toggleChose}
      editTodoListValue={props.editTodoListValue}
    />
  ))}
</List>)


ReactListComponentTodos.defaultProps = {
  listItems: [],
}

ReactListComponentTodos.propTypes = {
  listType: PropTypes.string.isRequired,
  listItems: PropTypes.array.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleChose: PropTypes.func.isRequired,
  editTodoListValue: PropTypes.func.isRequired,
}

export default ReactListComponentTodos
