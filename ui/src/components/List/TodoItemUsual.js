// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Checkbox, IconButton, Tooltip, ListItemText, ListItem, ListItemSecondaryAction,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import type { todoProps } from '../../props'

type Props = {
  todo: todoProps,
  toggleChose: Function,
  goToEdit: Function,
  deleteTodo: Function,
};

export default class ListItemUsual extends Component<Props> {
  iconStyle = { width: 17, height: 17, margin: 3 }

  render() {
    return <ListItem key={this.props.todo.title}
      style={{
        fontSize: '1em',
      }}
      role={undefined}
      dense
      button>
      <Checkbox
        checked={this.props.todo.chosen}
        onClick={this.props.toggleChose}
        color={'primary'}
        style={{
          maxWidth: 30,
          maxHeight: 30,
        }}
        disableRipple
      />
      <div className='todoTextHolder' style={{ display: 'inline-block' }} onClick={this.props.toggleChose}>
        <ListItemText
          style={(this.props.todo.chosen ? { textDecoration: 'line-through', cursor: 'pointer' }
            : { cursor: 'pointer' })}
          primary=
          {this.props.todo.title}
        />
      </div>
      <ListItemSecondaryAction className='icoHolder'>
        <IconButton
          onClick={this.props.goToEdit}
          style={this.iconStyle}
          aria-label="Edit">
          <Tooltip disableFocusListener title="Edit">
            <CreateIcon
              style={this.iconStyle} />
          </Tooltip>
        </IconButton>
        <IconButton
          onClick={this.props.deleteTodo}
          style={this.iconStyle}
          aria-label="Delete">
          <Tooltip disableFocusListener title="Delete">
            <DeleteIcon
              style={this.iconStyle} />
          </Tooltip>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  }
}

ListItemUsual.propTypes = {
  todo: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleChose: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
}
