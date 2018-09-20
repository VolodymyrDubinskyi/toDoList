// @flow

import React from 'react';
import PropTypes from 'prop-types'
import { Checkbox } from '@material-ui/core'

type HidingToggleProps = {
  editvisibility: Function,
  visibility: boolean,
}

const HidingToggle = (props :HidingToggleProps) => (<div className={'toggleListHolder onlyOwnPropretty'} >
  <Checkbox
    onChange={props.editvisibility}
    checked={props.visibility}
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


HidingToggle.propTypes = {
  editvisibility: PropTypes.func.isRequired,
  visibility: PropTypes.bool.isRequired,
}


export default HidingToggle
