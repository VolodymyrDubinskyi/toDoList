import React from 'react';
import PropTypes from 'prop-types'
import {
  Checkbox, IconButton, Tooltip, ListItemText, ListItem, ListItemSecondaryAction,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';


export default class ListItemUsual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: props.todo.chosen || false,
    };
  }

  iconStyle = { width: 17, height: 17, margin: 3 }

  toggleChose = () => {
    this.setState({ chosen: !this.state.chosen })
    this.props.toggleChose()
  }

  render() {
    return <ListItem key={this.props.todo.title}
      style={{
        fontSize: '1em',
      }}
      role={undefined}
      dense
      button>
      <Checkbox
        checked={this.state.chosen}
        onClick={this.toggleChose}
        color={'primary'}
        style={{
          maxWidth: 30,
          maxHeight: 30,
        }}
        disableRipple
      />
      <div className='todoTextHolder' style={{ display: 'inline-block' }} onClick={this.toggleChose}>
        <ListItemText
          style={(this.state.chosen ? { textDecoration: 'line-through', cursor: 'pointer' } : { cursor: 'pointer' })}
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
