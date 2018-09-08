import React from 'react';
import PropTypes from 'prop-types'
import { List } from '@material-ui/core'
import ListItem from './ListItem'

const ListComponentLists = props => <List>
  {props.listItems.map(list => (
    <ListItem
      list={list}
      key={`${list.id}`}
      deleteList={props.deleteList}
      goToTodolist={props.goToTodolist}
    />
  ))}
</List>


ListComponentLists.defaultProps = {
  listItems: [],
}

ListComponentLists.propTypes = {
  listItems: PropTypes.array.isRequired,
  deleteList: PropTypes.func.isRequired,
  goToTodolist: PropTypes.func.isRequired,
}

export default ListComponentLists
