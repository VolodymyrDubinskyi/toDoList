import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

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

  render() {
    const boards = this.props.boards ? this.props.boards.map(board => <div
      key={board.id}
      style={{
        display: 'inline-block',
        width: '25%',
        boxSizing: 'border-box',
      }}>
      <div className='boardBox'
        onClick={() => { this.goToBoard(board.id) }}
        style={{
          backgroundColor: board.color,
        }}>
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
          <div style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'white',
            padding: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100% - 16px)',
          }}>
            Create new board...
        </div>
        </div>
      </div>
      {this.state.creatingNewBoard ? <div>
        <div style={{
          width: 404,
          zIndex: 11,
          position: 'fixed',
          top: 48,
          left: 'calc(50% - 202px)',
        }}><div style={{
          width: 296,
          height: 96,
          display: 'inline-block',
          float: 'left',
          borderRadius: 3,
          backgroundColor: this.state.newBoardColor,
        }}>
            <input
              value={this.state.inputValue}
              onChange={this.updateInputValue}
              className='createBoardInput'
              placeholder='Add title of the board' />
          </div>
          <div style={{
            height: 96,
            marginLeft: 8,
            width: 100,
            display: 'inline-block',
            float: 'left',
          }}>
            <div className='createBoardColorsSelectList'>
              <div style={{ backgroundColor: 'red' }}
                onClick={() => this.setState({ newBoardColor: 'red' })}></div>
              <div style={{ backgroundColor: 'green' }}
                onClick={() => this.setState({ newBoardColor: 'green' })}></div>
              <div style={{ backgroundColor: 'yellow' }}
                onClick={() => this.setState({ newBoardColor: 'yellow' })}></div>
              <div style={{ backgroundColor: 'pink' }}
                onClick={() => this.setState({ newBoardColor: 'pink' })}></div>
              <div style={{ backgroundColor: 'blue' }}
                onClick={() => this.setState({ newBoardColor: 'blue' })}></div>
              <div style={{ backgroundColor: 'aqua' }}
                onClick={() => this.setState({ newBoardColor: 'aqua' })}></div>
              <div style={{ backgroundColor: 'white' }}
                onClick={() => this.setState({ newBoardColor: 'white' })}></div>
              <div style={{ backgroundColor: 'peru' }}
                onClick={() => this.setState({ newBoardColor: 'peru' })}></div>
              <div style={{ backgroundColor: 'lime' }}
                onClick={() => this.setState({ newBoardColor: 'lime' })}></div>
            </div>
          </div>
          <button className='createBoardButton' style={this.state.inputValue !== '' ? {
            color: 'white',
            backgroundColor: 'rgb(90,172,68)',
            cursor: 'pointer',
            float: 'left',
          } : { float: 'left' }}
            onClick={this.addBoard}>Create board</button>
        </div>
        <div style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }}
          onClick={this.stopCreatingBoard}>
        </div>
      </div> : <div />}
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
