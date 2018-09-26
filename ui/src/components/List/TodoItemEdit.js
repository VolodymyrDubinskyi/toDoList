// @flow

import React from 'react';
import PropTypes from 'prop-types'
// import {
//   IconButton, Tooltip, TextField, ListItem, ListItemSecondaryAction,
// } from '@material-ui/core'
// import SaveIcon from '@material-ui/icons/Save';
// import ClearIcon from '@material-ui/icons/Clear';
import type { todoProps } from '../../props'


type ListItemEditProps = {
  todo: todoProps,
  editValue: Function,
  updateEditValue: Function,
  saveAndStopEdditingUsingEnter: Function,
  saveAndStopEdditing: Function,
  stopEditing: Function,
}

const ListItemEdit = (props: ListItemEditProps) => {
  // const iconStyle = { width: 17, height: 17, margin: 3 }
  const itemEdit = (<div>
    <div
      onMouseDown={props.stopEditing}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }} />
    <div key={props.todo.title}
      style={{
        margin: 0,
        fontSize: '1em',
        zIndex: 25,
        position: 'absolute',
        borderRadius: 4,
        backgroundColor: '#fff',
        padding: '0px 8px',
      }}>
      <div className='todoEdditingTextareaHolder'>
        <textarea
          className='todoEdditingTextarea'
          value={props.editValue}
          onChange={e => props.updateEditValue(e)}
          onKeyDown={e => props.saveAndStopEdditingUsingEnter(e)}
        />
      </div>
      <button
        className='saveTodoChanges'
        onClick={props.saveAndStopEdditing}
      >
        Save
    </button>
    </div>
  </div>
  )

  return itemEdit
}

ListItemEdit.propTypes = {
  todo: PropTypes.object.isRequired,
  editValue: PropTypes.string.isRequired,
  updateEditValue: PropTypes.func.isRequired,
  saveAndStopEdditingUsingEnter: PropTypes.func.isRequired,
  saveAndStopEdditing: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired,
}

export default ListItemEdit
