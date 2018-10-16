// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux'

import type { callAddToDoParams } from '../../actions/todos'
import {
  addToDo,
} from '../../actions/todos'
import editComponent from '../../actions/components'
import type { userProps, listsProps } from '../../props'

type Props = {
  value: number,
  addToDo: (data: callAddToDoParams) => void,
  user: userProps,
  components: Object,
  editComponent: Function,
  list: listsProps,
  notOwnBoard: boolean,
  boardId: string,
};

type State = {
  inputValue: string,
}

export class AddToDoHolder extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  updateInputValue(e: Object) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  addTodo = () => {
    if (this.state.inputValue === '') return
    this.setState({ inputValue: '' })
    this.props.addToDo({
      listId: this.props.list.id,
      value: this.state.inputValue,
      boardId: this.props.boardId,
    })
  }

  addToDoUsingEnter = (e: Object) => {
    if (e.keyCode === 13) {
      this.addTodo()
    }
  }

  goToTodoAdding = () => {
    if (this.props.notOwnBoard) return
    this.props.editComponent({ [`${this.props.list.id}canAddNewTodo`]: true })
    window.addEventListener('mousedown', this.goToUsual)
  }

  goToUsual = (e: Object): null => {
    const { target } = e
    if (target.className === 'addTodoButton' || target.className === 'addTodoField') {
      return null
    }
    window.removeEventListener('mousedown', this.goToUsual)
    this.props.editComponent({ [`${this.props.list.id}canAddNewTodo`]: false })
    return null
  }

  render() {
    const usualPosition = (<div>
      <div
        onClick={this.goToTodoAdding}
        className='addNewTodo'
        style={{
        }}><b style={{ fontSize: 20 }} className='addToDoPlus'>{'+ '}</b><span className='addNewTodoText'
        >{'Create new todo'}</span>
      </div>
    </div>
    )

    const Field = <textarea
      label="Enter new Todo"
      value={this.state.inputValue}
      style={{
        margin: '0 0 6px',
        width: '236px',
        padding: '6px 8px',
        resize: 'vertical',
        minHeight: 40,
      }}
      onChange={e => this.updateInputValue(e)}
      onKeyDown={e => this.addToDoUsingEnter(e)}
      autoFocus={true}
      placeholder='Tell your plans'
      className='addTodoField'
    />

    const addingTodosState = <>{Field}<button
      className='addTodoButton'
      onClick={this.addTodo}
    >
      {'Add Todo'}
    </button><div style={{
      display: 'inline-block',
      width: 16,
      height: 16,
      padding: 8,
      position: 'relative',
      top: 8,
    }}>
        <ClearIcon
          className='closeAddTodoIcon'
        />
      </div></>

    return (
      <div className={'onlyOwnPropretty'} style={{ margin: 0 }}>
        {this.props.components[`${this.props.list.id}canAddNewTodo`] ? addingTodosState : usualPosition}
      </div>)
  }
}

AddToDoHolder.propTypes = {
  user: PropTypes.object.isRequired,
  addToDo: PropTypes.func.isRequired,
}

const mapStateToProps = (state: Object): Object => ({
  user: state.user,
  components: state.components,
})


const mapDispatchToProps = (dispatch: Function): Object => ({
  addToDo: addToDo(dispatch),
  editComponent: change => dispatch(editComponent(change)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AddToDoHolder)
