// @flow

import React from 'react';
import PropTypes from 'prop-types'
import { List } from '@material-ui/core'

import TodoItemWithConnect from './TodoItem'
import type { todoProps } from '../../props'


type ListTodosProps = {
  listItems: Array<todoProps>,
}

const ListTodos = (props :ListTodosProps) => (<List>
   { props.listItems.map((todo) => {
     if (todo.id) {
       return <TodoItemWithConnect
        todo={todo}
        key={`${todo.id}`}
      />
     }
     return null
   })}
</List>)

ListTodos.defaultProps = {
  listItems: [],
}

ListTodos.propTypes = {
  listItems: PropTypes.array.isRequired,
}

export default ListTodos
