// @flow

import React from 'react';
import PropTypes from 'prop-types'
import { List } from '@material-ui/core'

import ListItem from './ListItem'
import type { listsProps, userProps } from '../../props'


type ListListsProps = {
  lists: Array<listsProps>,
  getAllToDos: Function,
  user: userProps,
  deleteList: Function,
  addCurrentList: Function,
}

const ListLists = (props :ListListsProps) => <List>
  {props.lists.map(list => (
    <ListItem
    getAllToDos = {props.getAllToDos}
    user = {props.user}
      list={list}
      key={`${list.id}`}
      deleteList={props.deleteList}
      addCurrentList={props.addCurrentList}
      style={{
        backgroundColor: 'red',
      }}
    />
  ))}
</List>


ListLists.defaultProps = {
  listItems: [],
}

ListLists.propTypes = {
  addCurrentList: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
  deleteList: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  getAllToDos: PropTypes.func.isRequired,
}

export default ListLists
