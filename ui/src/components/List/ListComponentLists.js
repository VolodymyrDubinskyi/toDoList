import React from 'react';
import PropTypes from 'prop-types'
import { List } from '@material-ui/core'
import ListItem from './ListItem'

const ListComponentLists = props => <List>
  {props.lists.map(list => (
    <ListItem
    getAllToDos = {props.getAllToDos}
    user = {props.user}
      list={list}
      key={`${list.id}`}
      deleteList={props.deleteList}
      addCurrentList={props.addCurrentList}
    />
  ))}
</List>


ListComponentLists.defaultProps = {
  listItems: [],
}

ListComponentLists.propTypes = {
  addCurrentList: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
  deleteList: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  getAllToDos: PropTypes.func.isRequired,
}

export default ListComponentLists
