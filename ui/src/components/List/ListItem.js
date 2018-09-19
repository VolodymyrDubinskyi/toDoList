import React from 'react';
import PropTypes from 'prop-types'
import {
  ListItem, ListItemText, ListItemSecondaryAction,
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'


class ListItemList extends React.Component {
  deleteList = () => {
    this.props.deleteList(this.props.list.id)
  }

  render() {
    if (this.props.user.currentList) {
      this.props.history.push(`/user/${this.props.user.name}/list/${this.props.user.currentList}`)
    }

    return (
      <ListItem key={this.props.list.title}
        style={{
          padding: 0,
          margin: 0,
          fontSize: 20,
        }}
        dense
        button>
        <ListItemText
          onClick={() => {
            this.props.addCurrentList(this.props.list.id)
            this.props.getAllToDos(this.props.list.id)
          }}
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
  addCurrentList: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  deleteList: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  getAllToDos: PropTypes.func.isRequired,
}

export default withRouter(ListItemList)
