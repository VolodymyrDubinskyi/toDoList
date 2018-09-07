import React from 'react';
import PropTypes from 'prop-types'
import { Checkbox } from '@material-ui/core'

export default class ReactHidingToggle extends React.Component {
  render() {
    return (
      <div className={'toggleListHolder onlyOwnPropretty'} >
        <Checkbox
          onChange={this.props.changeUserVisibility}
          checked={this.props.user.visibility} 
          color={'primary'}
          style={{
            maxWidth: 12,
            maxHeight: 12,
            margin: 10,
          }}
          disableRipple
        />
        {/* <input type={'checkbox'}
          className={'visibilityToggle'}
          onChange={this.props.changeUserVisibility}
          checked={this.props.user.visibility} /> */}
        <span className={'toggleHolderTitle'}>Visible to other users:</span>
      </div>)
  }
}

ReactHidingToggle.propTypes = {
  changeUserVisibility: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
