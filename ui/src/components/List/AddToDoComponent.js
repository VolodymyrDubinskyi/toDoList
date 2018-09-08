import React from 'react';
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'

export default class AddToDoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  addTodo = () => {
    if (this.state.inputValue === '') return
    this.props.createTodo({
      title: this.state.inputValue,
      id: Math.ceil(Math.random() * 9999999999),
      chosen: false,
    })
    this.setState({
      inputValue: '',
    })
  }

  addToDoUsingEnter = (e) => {
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
        />
        <Button
          style={{ fontSize: '12px' }}
          variant="contained" color="primary"
          className={'addNewElemBtn'}
          onClick={this.addTodo}>
          {'Add Todo'}
        </Button>
      </div>)
  }
}

AddToDoComponent.propTypes = {
  createTodo: PropTypes.func.isRequired,
}
