import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'
import {
  addToDo,
} from '../../actions/actions'

class AddToDoComponent extends React.Component {
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
    this.props.addToDo(this.props.user.currentList, this.state.inputValue)
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

AddToDoComponent.propTypes = {
  addToDo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  addToDo: (id, todoTitle) => dispatch(addToDo(id, todoTitle)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToDoComponent)
