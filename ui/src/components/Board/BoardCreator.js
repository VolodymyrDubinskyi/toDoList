import React from 'react';
import PropTypes from 'prop-types'

class AllBoards extends React.Component {
  render() {
    return <div>
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
      backgroundColor: this.props.newBoardColor,
      position: 'relative',
    }}>
        <div className='closeBoardCreation'
          onClick={() => { this.props.setParentState({ creatingNewBoard: false }) }}
          style={{
            position: 'absolute',
            top: -2,
            right: 7,
            color: 'white',
            cursor: 'pointer',
            zIndex: 12,
            fontSize: 20,
          }}>x</div>
        <input
          value={this.props.inputValue}
          onChange={this.props.updateInputValue}
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
          <div style={{ background: 'red' }}
            onClick={() => this.props.setParentState({ newBoardColor: 'red' })}></div>
          <div style={{ backgroundColor: 'green' }}
            onClick={() => this.props.setParentState({ newBoardColor: 'green' })}></div>
          <div style={{ backgroundColor: 'yellow' }}
            onClick={() => this.props.setParentState({ newBoardColor: 'yellow' })}></div>
          <div style={{ backgroundColor: 'pink' }}
            onClick={() => this.props.setParentState({ newBoardColor: 'pink' })}></div>
          <div style={{ backgroundColor: 'blue' }}
            onClick={() => this.props.setParentState({ newBoardColor: 'blue' })}></div>
          <div style={{ backgroundColor: 'aqua' }}
            onClick={() => this.props.setParentState({ newBoardColor: 'aqua' })}></div>
          <div style={{ backgroundColor: 'white' }}
            onClick={() => this.props.setParentState({ newBoardColor: 'white' })}></div>
          <div style={{ backgroundColor: 'peru' }}
            onClick={() => this.props.setParentState({ newBoardColor: 'peru' })}></div>
          <div style={{ backgroundColor: 'lime' }}
            onClick={() => this.props.setParentState({ newBoardColor: 'lime' })}></div>
        </div>
      </div>
      <button className='createBoardButton' style={this.props.inputValue !== '' ? {
        color: 'white',
        backgroundColor: 'rgb(90,172,68)',
        cursor: 'pointer',
        float: 'left',
      } : { float: 'left' }}
        onClick={this.props.addBoard}>Create board</button> <br></br>
      <button onClick={this.props.changePrivacy} className='createBoardButton' >
      {this.props.private ? 'Private' : 'Public'}
      </button>
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
      onClick={this.props.stopCreatingBoard}>
    </div>
  </div>
  }
}

AllBoards.propTypes = {
  newBoardColor: PropTypes.string,
  setParentState: PropTypes.func,
  inputValue: PropTypes.string,
  changePrivacy: PropTypes.func,
  private: PropTypes.bool,
  stopCreatingBoard: PropTypes.func,
  addBoard: PropTypes.func,
  updateInputValue: PropTypes.func,
}

export default AllBoards
