// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'

import type { callEditListParams } from '../../actions/lists'
import type { userProps, listsProps } from '../../props'
import { connect } from '../../../react-myRedux'
import { editList } from '../../actions/lists'

type Props = {
  lists: Array<listsProps>,
  title: string,
  user: userProps,
  editList: (callEditListParams) => void,
};
type State = {
  editValue: string,
}

class HidingToggle extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      editValue: this.props.title,
    };
  }

  updateValue = (e: Object) => {
    this.setState({
      editValue: e.target.value,
    });
  }


  changeTitle = (e: Object) => {
    if (e.keyCode === 13) {
      const changes = {
        title: this.state.editValue,
      }

      this.props.editList({
        name: this.props.user.name,
        id: this.props.user.currentList,
        changes,
      })
    }
  }

  changeTitleOnBlur = () => {
    const changes = {
      title: this.state.editValue,
    }

    this.props.editList({
      name: this.props.user.name,
      id: this.props.user.currentList,
      changes,
    })
  }

  render() {
    return (<div
      style={{
        padding: '10px 36px 8px 8px',
        margin: 0,
      }}
    >
      <textarea
        className={'toggleHolderTitle'}
        value={this.state.editValue}
        onChange={this.updateValue}
        onBlur={this.changeTitleOnBlur}
        onKeyDown={e => this.changeTitle(e)}
        style={{
          padding: '4px 7px',
          fontWeight: 700,
          fontSize: 14,
        }} />
    </div>)
  }
}


HidingToggle.propTypes = {
  title: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  lists: state.lists,
  state,
})

const mapDispatchToProps = dispatch => ({
  editList: editList(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HidingToggle)
