import React from 'react';
import PropTypes from 'prop-types'
import {
  IconButton, Tooltip, TextField,
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';


const ReactListItemEdit = (props) => {
  const iconStyle = { width: 17, height: 17, margin: 3 }
  return <div className={'listEvent'}>
    <TextField
      type='Editting'
      style={{ margin: 0 }}
      fullWidth={true}
      label="Editting:"
      value={props.editValue}
      onChange={e => props.updateEditValue(e)}
      onKeyDown={e => props.saveAndStopEdditingUsingEnter(e)}
      margin="normal"
    />
    <div className='icoHolder' style={{ display: 'inline-block', width: 70 }}>
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
    </div>
  </div>
}

ReactListItemEdit.propTypes = {
  editValue: PropTypes.string.isRequired,
  updateEditValue: PropTypes.func.isRequired,
  saveAndStopEdditingUsingEnter: PropTypes.func.isRequired,
  saveAndStopEditing: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired,
}

export default ReactListItemEdit
