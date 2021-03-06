import React from 'react';
import PropTypes from 'prop-types'
import BoardAdditionalSettsing from './BoardAdditionalSettsing'

class boardSetsing extends React.Component {
  constructor(props: Object) {
    super(props)
    this.state = {
      addingUserToBoard: false,
      editingTittle: false,
      editingPrivacy: false,
      isAdditionalSettingOpened: false,
      inputValue: '',
    }
  }

  changePrivacy = (isPrivate) => {
    this.props.changeBoardPrivacy(isPrivate)
  }

  startEditingPrivacy = () => {
    if (this.props.notOwnBoard) return
    this.setState({ editingPrivacy: true })
    document.addEventListener('click', this.stopEditingPrivacy)
  }

  stopEditingPrivacy = (e) => {
    if (e) {
      const { target } = e
      if (target.className.indexOf('dialogBox') === -1) {
        this.setState({ editingPrivacy: false })
        document.removeEventListener('click', this.stopEditingPrivacy)
      }
    } else {
      this.setState({ editingPrivacy: false })
      document.removeEventListener('click', this.stopEditingPrivacy)
    }
  }

  changeTitle = () => {
    this.props.changeBoardTitle(this.state.inputValue)
  }

  startEditingTitle = () => {
    if (this.props.notOwnBoard) return
    this.setState({ editingTittle: true })
    document.addEventListener('click', this.stopEditingTitle)
  }

  stopEditingTitle = (e) => {
    if (e) {
      const { target } = e
      if (target.className.indexOf('dialogBox') === -1) {
        this.setState({ editingTittle: false })
        document.removeEventListener('click', this.stopEditingTitle)
      }
    } else {
      this.setState({ editingTittle: false })
      document.removeEventListener('click', this.stopEditingTitle)
    }
  }

  updateInputValue = (e: Object) => {
    this.setState({
      inputValue: e.target.value,
    });
  }

  startAddingUser = () => {
    if (this.props.notOwnBoard) return
    this.setState({ addingUserToBoard: true })
    document.addEventListener('click', this.stopAddingUser)
  }

  stopAddingUser = (e) => {
    if (e) {
      const { target } = e
      if (target.className.indexOf('dialogBox') === -1) {
        this.setState({ addingUserToBoard: false })
        document.removeEventListener('click', this.stopAddingUser)
      }
    } else {
      this.setState({ addingUserToBoard: false })
      document.removeEventListener('click', this.stopAddingUser)
    }
  }

  addAccessToUser = (e) => {
    if (e.keyCode === 13) {
      this.props.addAccessToUser(this.state.inputValue)
      this.stopAddingUser()
    }
  }

  openMoreSettings = () => {
    this.setState({ isAdditionalSettingOpened: true })
    this.props.openMoreSettings()
  }

  closeMoreSettings = () => {
    this.setState({ isAdditionalSettingOpened: false })
    this.props.closeMoreSettings()
  }

  render() {
    const { board } = this.props
    const usersWithAccess = board.usersWithAccess.map(name => <div key={`User with access ${name}`} style={{
      display: 'inline-block',
      cursor: 'pointer',
      backgroundColor: 'rgb(220, 220, 220)',
    }} className='boardAccessedUsers'>
      <div className='boardAccessedUsersHolder' >
        <div className='boardAccessedUsersNickname'>
          {name}
        </div>
      </div>
      <div>
        {name[0].toUpperCase()}
      </div></div>)

    return <div
      className='boardSetsing'
      style={{
        marginBottom: 8,
        padding: 8,
        height: 32,
        backgroundColor: 'rgba(0,0,0,.2)',
        minWidth: 'calc(100% - 4px)',
        position: 'fixed',
        zIndex: 15,
      }}>
      <span className='boardTitleAtList' onClick={this.startEditingTitle}>{this.props.board.title}
        {this.state.editingTittle ? <div
          className='dialogBox'
          style={{
            position: 'absolute',
            width: 280,
            padding: 12,
            backgroundColor: 'white',
            color: '#6b808c',
            fontFamily: 'Helvetica Neue,Arial,Helvetica,sans-serif',
            fontSize: 14,
            lineHeight: '20px',
            fontWeight: 400,
          }}>
          <div style={{
            borderBottom: '1px solid rgba(9,45,66,.13)',
            textAlign: 'center',
          }} className='dialogBox'>Change title</div>
          <div style={{
            position: 'absolute',
            top: 10,
            right: 12,
            cursor: 'pointer',
          }}>x</div>
          <input className='dialogBox addAccessToUserInput'
            placeholder='Write new title'
            onChange={this.updateInputValue} />
          <button className='addTitleButton' onClick={this.changeTitle}>Change title
            </button>
        </div> : null}
      </span>
      <span style={{
        borderLeft: '1px solid hsla(0,0%,100%,.2)',
        height: 16,
        margin: '8px 4px 0 0',
      }} />
      <div className='boardPrivacyAtList' onClick={this.startEditingPrivacy}>
        {this.props.board.private ? 'Private' : 'Public'}
        {this.state.editingPrivacy ? <div
          className='dialogBox'
          style={{
            position: 'absolute',
            width: 280,
            padding: 12,
            backgroundColor: 'white',
            color: '#6b808c',
            fontFamily: 'Helvetica Neue,Arial,Helvetica,sans-serif',
            fontSize: 14,
            lineHeight: '20px',
            fontWeight: 400,
          }}>
          <div style={{
            borderBottom: '1px solid rgba(9,45,66,.13)',
            textAlign: 'center',
          }} className='dialogBox'>Change privacy</div>
          <div style={{
            position: 'absolute',
            top: 10,
            right: 12,
            cursor: 'pointer',
          }}>x</div>
          <div style={{
            margin: '8px -12px 0',
          }}
            className='changePrivacy'>
            <div onClick={() => { this.changePrivacy(true) }}>Private</div>
            <div onClick={() => { this.changePrivacy(false) }}>Public</div>
          </div>
        </div> : null}
      </div>
      <span style={{
        borderLeft: '1px solid hsla(0,0%,100%,.2)',
        height: 16,
        margin: '8px 4px 0 0',
      }} />
      <div style={{ marginLeft: 10, display: 'inline-block' }}>
        {usersWithAccess}
      </div>
      <div style={{
        display: 'inline-block',
        margin: '2px 8px 0 13px',
      }} className='addAccessToUser'
        onClick={this.startAddingUser}>
        <div className='addAccessToUserHolder' />
        <div>
          +
      </div>

        {this.state.addingUserToBoard ? <div
          className='dialogBox'
          style={{
            position: 'absolute',
            width: 280,
            padding: 12,
            backgroundColor: 'white',
            color: '#6b808c',
            fontFamily: 'Helvetica Neue,Arial,Helvetica,sans-serif',
            fontSize: 14,
            lineHeight: '20px',
            fontWeight: 400,
          }}>
          <div style={{
            borderBottom: '1px solid rgba(9,45,66,.13)',
          }} className='dialogBox'>Add member</div>
          <div style={{
            position: 'absolute',
            top: 10,
            right: 12,
            cursor: 'pointer',
          }}>x</div>
          <input className='dialogBox addAccessToUserInput'
            placeholder='Write some nickname'
            onChange={this.updateInputValue} onKeyDown={this.addAccessToUser} />
        </div> : null}
      </div>

      {this.state.isAdditionalSettingOpened ? <BoardAdditionalSettsing
        boardId = {this.props.boardId}
        closeMoreSettings={this.closeMoreSettings}
      /> : null}

      <div style={{
        float: 'right',
        paddingLeft: 32,
        paddingRight: 8,
        marginRight: 12,
        position: 'relative',
        color: 'white',
      }}
        onClick={this.openMoreSettings}
        className='boardPrivacyAtList'>
        <div style={{
          position: 'absolute',
          margin: 6,
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          textAlign: 'center',
        }}>
          <div style={{
            fontWeight: 1000,
            lineHeight: '12px',
          }}>...</div>
        </div>
        <span style={{
          textDecoration: 'underline',
          fontSize: 14,
          fontFamily: 'Helvetica Neue,Arial,Helvetica,sans-serif',
          fontWeight: 400,
        }}>Show menu</span>
      </div>
    </div>
  }
}

boardSetsing.propTypes = {
  board: PropTypes.object,
  addAccessToUser: PropTypes.func,
  changeBoardPrivacy: PropTypes.func,
  changeBoardTitle: PropTypes.func,
  notOwnBoard: PropTypes.bool,
  openMoreSettings: PropTypes.func,
  closeMoreSettings: PropTypes.func,
  boardId: PropTypes.string,
}

export default boardSetsing
