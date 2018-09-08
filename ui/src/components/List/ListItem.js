import React from 'react';
import PropTypes from 'prop-types'
import {
  ListItem, ListItemText, ListItemSecondaryAction,
} from '@material-ui/core'


export default class ListItemList extends React.Component {
  deleteList = () => {
    this.props.deleteList(this.props.list.id)
  }

  goToTodolist = () => {
    this.props.goToTodolist(this.props.list.title)
  }

  render() {
    return (
      <ListItem key={this.props.list.title}
        style={{
          padding: 0,
          margin: 0,
          fontSize: 20,
        }}
        role={undefined}
        dense
        button>
        <ListItemText
          onClick={this.goToTodolist}
          style={{
            fontSize: '1em',
          }}>
          {this.props.list.title}
        </ListItemText>
        <ListItemSecondaryAction
          onClick={this.deleteList}
          style={{ fontStyle: 'italic', color: 'red', cursor: 'pointer' }}>
          del
        </ListItemSecondaryAction>
      </ListItem >)
  }
}

ListItemList.propTypes = {
  list: PropTypes.object.isRequired,
  deleteList: PropTypes.func.isRequired,
  goToTodolist: PropTypes.func.isRequired,
}
