// @flow

import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


import EventList from './Profile/EventList'
import addEvents from '../actions/events'
import {
  tokenLogin,
} from '../actions/user'
import {
  getBoard,
} from '../actions/boards'
import {
  getAllLists,
} from '../actions/lists'

type Props = {
  events: Array<any>,
  addEvents: Function,
  user: Object,
  history: Object,
  tokenLogin: Function,
  getBoard: Function,
  getAllLists: Function,
};

type State = {
  currentProfilePage: string,
}

class Profile extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = {
      currentProfilePage: 'profile',
    }
  }

  componentWillMount() { //eslint-disable-line
    if (localStorage.getItem('token') && this.props.user && !this.props.user.name) {
      this.props.tokenLogin()
    }
  }

  changeProgilePage(page) {
    this.setState({ currentProfilePage: page })
  }

  render() {
    if (this.props.events.length === 0 && this.props.user.id) {
      this.props.addEvents({ id: this.props.user.id, query: { userId: this.props.user.id } })
    }
    return <div
      style={{
        minWidth: '100%',
        height: 'calc(100vh - 40px)',
        paddingTop: 40,
      }} className='createBoardImg'>
      <div style={{
        backgroundColor: '#f5f6f7',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 650,
            margin: 32,
            display: 'flex',
            alignItems: 'flex-start',
          }}>
            <div className='bigAvatar'>
              <span className='bigAvatarLetter'>
                {this.props.user.name ? this.props.user.name[0].toUpperCase() : null}
              </span>
            </div>
            <div style={{
              marginLeft: 20,
              display: 'inline-block',
            }}>
              <div>
                <h1 style={{
                  margin: 0,
                  color: '#17394d',
                  display: 'inline-block',
                }}>{this.props.user.name}</h1>
                <p style={{
                  display: 'inline-block',
                  fontSize: 12,
                  fontWeight: 400,
                  color: '#6b808c',
                }}>{`@id${this.props.user.id}`}</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          borderBottom: '1px solid #dfe3e6',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div className={this.state.currentProfilePage !== 'profile' ? 'profileButtonHolderChosen' : 'profileButtonHolder'}>
            <span className='profileButton'
              onClick={() => { this.changeProgilePage('profile') }}>Profile</span>
          </div>
          <div className={this.state.currentProfilePage !== 'gold' ? 'profileButtonHolderChosen' : 'profileButtonHolder'}>
            <span className='profileButton'
              onClick={() => { this.changeProgilePage('gold') }}>Gold</span>
          </div>
        </div>
      </div>
      <div style={{
        width: 900,
        height: 100,
        margin: '0 auto',
        padding: 32,
      }}>{this.state.currentProfilePage === 'profile' ? <div><div style={{
        margin: '0 0 4px 40px',
        padding: '8px 0',
        borderBottom: '1px solid rgba(9,45,66,.13)',
      }}>
        <h3 style={{
          color: 'rgb(23, 57, 77)',
          display: 'inline-block',
          fontFamily: '"Helvetica Neue", Arial, Helvetica, sans-serif',
          fontSize: 16,
          margin: 0,
          fontWeight: 700,
        }}>Activity</h3>
      </div>
        <EventList events={this.props.events} />
      </div> : <div></div>}
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  state,
  events: state.events,
  user: state.user,
})

const mapDispatchToProps = (dispatch: Function) => ({
  addEvents: addEvents(dispatch),
  tokenLogin: tokenLogin(dispatch),
  getBoard: getBoard(dispatch),
  getAllLists: getAllLists(dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
