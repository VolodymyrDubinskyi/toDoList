import React from 'react';
import PropTypes from 'prop-types'

import AllBoards from './AllBoards'

class BoardsContainer extends React.Component {
  render() {
    return <div style={{
      width: 860,
      marginRight: 10,
      marginTop: 20,
      paddingLeft: 64,
      boxSizing: 'border-box',
    }}>
      <div style={{
        marginLeft: 40,
        marginBottom: 11,
        color: '#17394d',
        fontFamily: 'Helvetica Neue,Arial,Helvetica,sans-serif',
        lineHeight: '20px',
        fontSize: 16,
        fontWeight: 700,
      }}>Your boards</div>
      <AllBoards addBoard={this.props.addBoard} boards={this.props.boards} user={this.props.user}/>
    </div>
  }
}

BoardsContainer.propTypes = {
  user: PropTypes.object,
  addBoard: PropTypes.func,
  boards: PropTypes.array,
}

export default BoardsContainer
