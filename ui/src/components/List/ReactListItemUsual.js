import React from 'react';
import PropTypes from 'prop-types'
import {
  Checkbox, IconButton, Tooltip,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';


const ReactListItemUsual = (props) => {
  const iconStyle = { width: 17, height: 17, margin: 3 }

  return <div className={'listEvent'}>
    <Checkbox
      checked={props.todo.chosen}
      onClick={props.toggleChose}
      color={'primary'}
      style={{
        maxWidth: 30,
        maxHeight: 30,
      }}
      disableRipple
    />
    <div className='todoTextHolder' style={{ display: 'inline-block' }} onClick={props.toggleChose}>
      <span
        style={(props.todo.chosen ? { textDecoration: 'line-through', cursor: 'pointer' } : { cursor: 'pointer' })}>
        {props.todo.title}
      </span>
    </div>
    <div className='icoHolder' style={{ display: 'inline-block' }}>
      <IconButton
        onClick={props.goToEdit}
        style={iconStyle}
        aria-label="Edit">
        <Tooltip disableFocusListener title="Edit">
          <CreateIcon
            style={iconStyle} />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={props.deleteTodo}
        style={iconStyle}
        aria-label="Delete">
        <Tooltip disableFocusListener title="Delete">
          <DeleteIcon
            style={iconStyle} />
        </Tooltip>
      </IconButton>
    </div>
  </div >
}

ReactListItemUsual.propTypes = {
  todo: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleChose: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
}

export default ReactListItemUsual
