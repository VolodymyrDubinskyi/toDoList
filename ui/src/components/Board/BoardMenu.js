import React from 'react';
import PropTypes from 'prop-types'

const BoardMenu = () => <div style={{
  marginTop: 20,
}}>
  <div style={{
    marginLeft: 10,
  }}>
    <span style={{
      padding: '6px 8px 6px',
      marginBottom: 4,
      color: '#17394d',
      backgroundColor: '#E4F0F6',
      display: 'inline-block',
      borderRadius: 4,
      cursor: 'pointer',
      fontFamily: 'Helvetica Neue,Arial,Helvetica,sans-serif',
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 'bold',
      width: 202,
    }}>
      Boards
        </span>
  </div>
</div>


BoardMenu.propTypes = {
  user: PropTypes.object,
}

export default BoardMenu
