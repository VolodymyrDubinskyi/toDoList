import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import BoardCreator from './BoardCreator'

class AllBoards extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      inputValue: '',
      creatingNewBoard: false,
      private: false,
      newBoardColor: `rgb(${Math.ceil(Math.random() * 255)},
        ${Math.ceil(Math.random() * 255)},
        ${Math.ceil(Math.random() * 255)})`,
    };
  }

  addBoard = () => {
    if (this.state.inputValue !== '') {
      const payload = {
        private: this.state.private,
        color: this.state.newBoardColor,
        title: this.state.inputValue,
      }
      this.props.addBoard(this.props.user, payload)
      this.setState({
        inputValue: '',
        creatingNewBoard: false,
      })
    }
  }

  changePrivacy = () => {
    this.setState({ private: !this.state.private })
  }

  updateInputValue = (e: Object) => {
    this.setState({
      inputValue: e.target.value,
    });
  }

  stopCreatingBoard = () => {
    this.setState({ creatingNewBoard: false })
  }

  startBoardCreating = () => {
    this.setState({ creatingNewBoard: true })
  }

  goToBoard = (id) => {
    this.props.history.push(`/user/${this.props.user.name}/board/${id}`)
  }

  setStateFromChild = (changes) => {
    this.setState(changes)
  }

  render() {
    const boards = this.props.boards ? this.props.boards.map(board => <div
      key={board.id}
      style={{
        display: 'inline-block',
        width: '25%',
        boxSizing: 'border-box',
        position: 'relative',
      }}>
      <div className='boardBox createBoardImg'
        onClick={() => { this.goToBoard(board.id) }}
        style={{
          backgroundColor: board.color,
          backgroundImage: board.color,
        }}>
        <div
          className='boardShadowBox'
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 3,
          }} />
        <div style={{
          fontSize: 16,
          fontWeight: 700,
          color: 'white',
          padding: 8,
        }}>
          {board.title}
        </div>
      </div>
    </div>) : null

    return <div style={{
      display: 'flex',
      flexWrap: 'wrap',
    }}>
      {boards}
      <div style={{
        display: 'inline-block',
        width: '25%',
        boxSizing: 'border-box',
      }}>
        <div className='boardBox'
          onClick={this.startBoardCreating}>
          <div className='newBoardCreator'>
            Create new board...
        </div>
        </div>
      </div>
      {this.state.creatingNewBoard ? <BoardCreator
        newBoardColor={this.state.newBoardColor}
        setParentState={this.setStateFromChild}
        inputValue={this.state.inputValue}
        changePrivacy={this.changePrivacy}
        private={this.state.private}
        stopCreatingBoard={this.stopCreatingBoard}
        addBoard={this.addBoard}
        updateInputValue={this.updateInputValue}
      /> : <div />}
    </div>
  }
}

AllBoards.propTypes = {
  user: PropTypes.object,
  addBoard: PropTypes.func,
  boards: PropTypes.array,
  history: PropTypes.object,
}

export default withRouter(AllBoards)
