// @flow

import React from 'react';
import PropTypes from 'prop-types'
import {
  IconButton, Tooltip, TextField, ListItem, ListItemSecondaryAction,
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import type { todoProps } from '../../props'


type ListItemEditProps = {
  todo: todoProps,
  editValue: Function,
  updateEditValue: Function,
  saveAndStopEdditingUsingEnter: Function,
  saveAndStopEditing: Function,
  stopEditing: Function,
}

const ListItemEdit = (props :ListItemEditProps) => {
  const iconStyle = { width: 17, height: 17, margin: 3 }
  return <ListItem key={props.todo.title}
    style={{
      padding: 0,
      margin: 0,
      fontSize: '1em',
    }}
    role={undefined}
    dense
    button>
    <TextField
      type='Editting'
      fullWidth
      label="Editting:"
      value={props.editValue}
      onChange={e => props.updateEditValue(e)}
      onKeyDown={e => props.saveAndStopEdditingUsingEnter(e)}
      margin="normal"
    />
    <ListItemSecondaryAction className='icoHolder' style={{ display: 'inline-block', width: 70 }}>
      <IconButton
        onClick={props.saveAndStopEditing}
        style={iconStyle}
        aria-label="Save">
        <Tooltip disableFocusListener title="Save changes">
          <SaveIcon
            style={iconStyle} />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={props.stopEditing}
        style={iconStyle}
        aria-label="Cancel editing">
        <Tooltip disableFocusListener title="Cancel editing">
          <ClearIcon
            style={iconStyle} />
        </Tooltip>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
}

ListItemEdit.propTypes = {
  todo: PropTypes.object.isRequired,
  editValue: PropTypes.string.isRequired,
  updateEditValue: PropTypes.func.isRequired,
  saveAndStopEdditingUsingEnter: PropTypes.func.isRequired,
  saveAndStopEditing: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired,
}

export default ListItemEdit
