// @flow

import React from 'react';
import PropTypes from 'prop-types'
// import { List } from '@material-ui/core'

import TodoItemWithConnect from './TodoItem'
import type { todoProps, listsProps } from '../../props'


type ListTodosProps = {
  listItems: Array<todoProps>,
  list: listsProps,
}

const ListTodos = (props: ListTodosProps) => (<div>
  {props.listItems.map((todo) => {
    if (todo.id) {
      return <TodoItemWithConnect
        todo={todo}
        key={`${todo.id}`}
        listId={props.list.id}
      />
    }
    return null
  })}
</div>)

ListTodos.defaultProps = {
  listItems: [],
}

ListTodos.propTypes = {
  listItems: PropTypes.array.isRequired,
}

export default ListTodos
