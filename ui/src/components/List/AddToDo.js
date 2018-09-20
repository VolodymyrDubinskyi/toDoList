// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'

import type { callAddToDoParams } from '../../actions/todos'
import { connect } from '../../../react-myRedux'
import {
  addToDo,
} from '../../actions/todos'
import type { userProps } from '../../props'

type Props = {
  value: number,
  addToDo: (data: callAddToDoParams) => void,
  user: userProps,
};

type State = {
  inputValue: string,
}

export class AddToDoHolder extends Component<Props, State> {
  constructor(props :Object) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  updateInputValue(e :Object) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  addTodo = () => {
    if (this.state.inputValue === '') return
    this.props.addToDo({ listId: this.props.user.currentList, value: this.state.inputValue })
  }

  addToDoUsingEnter = (e :Object) => {
    if (e.keyCode === 13) {
      this.addTodo()
    }
  }

  render() {
    return (
      <div className={'onlyOwnPropretty addToDoHolder'}>
        <TextField
          label="Enter new Todo"
          value={this.state.inputValue}
          style={{ margin: 5 }}
          onChange={e => this.updateInputValue(e)}
          onKeyDown={e => this.addToDoUsingEnter(e)}
          margin="normal"
          autoFocus={true}
        />
        <Button
          style={{ fontSize: '12px' }}
          variant="contained" color="primary"
          className={'addNewElemBtn'}
          onClick={this.addTodo}
        >
          {'Add Todo'}
        </Button>
      </div>)
  }
}

AddToDoHolder.propTypes = {
  user: PropTypes.object.isRequired,
  addToDo: PropTypes.func.isRequired,
}

const mapStateToProps = (state :Object) :Object => ({
  user: state.user,
})


const mapDispatchToProps = (dispatch :Function) :Object => ({
  addToDo: addToDo(dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(AddToDoHolder)
