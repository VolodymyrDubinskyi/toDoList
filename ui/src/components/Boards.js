import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import BoardMenu from './Board/BoardMenu'
import BoardsContainer from './Board/BoardsContainer'
import {
  addBoard, removeBoard, editBoard,
} from '../actions/boards'
import { clearListsAndTodos } from '../actions/user'

class Boards extends React.Component {
  componentWillMount() { //eslint-disable-line
    this.props.clearListsAndTodos()
  }

  render() {
    if (!this.props.user.name) {
      this.props.history.push('/authorization')
      return null
    }
    return <div
      style={{
        width: '100%',
        height: 'calc(100vh - 66px)',
        marginTop: 66,
        backgroundColor: 'white',
      }}>
      <div style={{
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
      }}>
        <BoardMenu />
        <BoardsContainer
          addBoard={this.props.addBoard}
          user={this.props.user}
          boards={this.props.boards} />
      </div>
    </div>
  }
}

Boards.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  addBoard: PropTypes.func,
  boards: PropTypes.array,
  clearListsAndTodos: PropTypes.func,
}

const mapStateToProps = state => ({
  state,
  user: state.user,
  boards: state.boards,
})

const mapDispatchToProps = dispatch => ({
  addBoard: addBoard(dispatch),
  removeBoard: removeBoard(dispatch),
  editBoard: editBoard(dispatch),
  clearListsAndTodos: () => dispatch(clearListsAndTodos()),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Boards))
