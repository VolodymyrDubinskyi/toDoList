// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  ListItem, ListItemText, ListItemSecondaryAction,
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import type { listsProps, userProps } from '../../props'


type Props = {
  deleteList: (string) => void,
  list: listsProps,
  user: userProps,
  history: Object,
  addCurrentList: (string) => void,
  getAllToDos: (string) => void,
};
type State = {
  hover: boolean,
}

class ListItemList extends Component<Props, State> {
  constructor(props :Object) {
    super(props);
    this.state = {
      titleEdit: false,
      hover: false,
    };
  }

  toggleHover = () => {
    this.setState({ hover: !this.state.hover })
  }

  deleteList = () => {
    this.props.deleteList(this.props.list.id)
  }

  render() {
    if (this.props.user.currentList) {
      this.props.history.push(`/user/${this.props.user.name}/list/${this.props.user.currentList}`)
    }
    const style = {
      color: '#17394d',
      padding: '6px 8px 2px',
      margin: 0,
      backgroundColor: '#fff',
      marginBottom: 8,
      boxShadow: '0 1px 0 rgba(9,45,66,.25)',
      borderRadius: 3,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: 400,
    }

    return (
      <ListItem key={this.props.list.title}
        style={style}
        dense
        onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}
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
