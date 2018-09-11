import React from 'react';
import PropTypes from 'prop-types'
import {
  ListItem, ListItemText, ListItemSecondaryAction,
} from '@material-ui/core'
import { Link } from 'react-router-dom'


export default class ListItemList extends React.Component {
  deleteList = () => {
    this.props.deleteList(this.props.list.id)
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
        <Link to={`/user/${this.props.user.name}/list/${this.props.list.title}`}>
          <ListItemText
            onClick={() => { this.props.addCurrentList(this.props.list.id) }}
            style={{
              fontSize: '1em',
            }}>
            {this.props.list.title}
          </ListItemText>
        </Link>
        <ListItemSecondaryAction
          onClick={this.deleteList}
          style={{ fontStyle: 'italic', color: 'red', cursor: 'pointer' }}>
          del
        </ListItemSecondaryAction>
      </ListItem >)
  }
}

ListItemList.propTypes = {
  addCurrentList: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  deleteList: PropTypes.func.isRequired,
}
