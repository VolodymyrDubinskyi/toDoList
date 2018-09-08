import React from 'react';
import PropTypes from 'prop-types'
import { Checkbox } from '@material-ui/core'

export default class HidingToggle extends React.Component {
  render() {
    return (
      <div className={'toggleListHolder onlyOwnPropretty'} >
        <Checkbox
          onChange={this.props.changeVisibility}
          checked={this.props.elem.visibility}
          color={'primary'}
          style={{
            maxWidth: 12,
            maxHeight: 12,
            margin: 10,
          }}
          disableRipple
        />
        <span className={'toggleHolderTitle'}>Visible to other users:</span>
      </div>)
  }
}

HidingToggle.propTypes = {
  changeVisibility: PropTypes.func.isRequired,
  elem: PropTypes.object.isRequired,
}
