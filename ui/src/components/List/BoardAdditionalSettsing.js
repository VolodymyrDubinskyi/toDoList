// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EventList from '../Profile/EventList'

import addEvents from '../../actions/events'

type Props = {
  closeMoreSettings: Function,
  events: Array<Object>,
  addEvents: Function,
  user: Object,
  boardId: String,
}

type State = {}

export class AddToDoHolder extends Component<Props, State> {
  componentWillMount() { //eslint-disable-line
    this.props.addEvents({ id: this.props.user.id, query: { boardId: this.props.boardId } })
  }

  render() {
    return (
      <div style={{
        height: 'calc(100vh - 40px)',
        width: 321,
        padding: '0 6px 0 12px',
        backgroundColor: '#ebeef0',
        position: 'fixed',
        right: 0,
        zIndex: 10,
        top: 40,
        overflowY: 'scroll',
      }}>

        <div style={{
          textAlign: 'center',
        }}>
          <h3 style={{
            fontSize: 16,
            color: '#17394d',
            fontFamily: 'Helvetica Neue,Arial,Helvetica,sans-serif',
            lineHeight: '20px',
            margin: '14px 32px',
          }}>Menu</h3>
          <div style={{
            position: 'absolute',
            top: 10,
            right: 16,
            color: 'grey',
            cursor: 'pointer',
          }}
            onClick={this.props.closeMoreSettings}>X</div>
        </div>
        <hr />
        <h3 style={{
          margin: 0,
          color: 'rgb(23, 57, 77)',
          padding: '6px 6px 0px 40px',
        }}>Activity</h3>
        <EventList events={this.props.events} />
      </div>)
  }
}

AddToDoHolder.propTypes = {
  closeMoreSettings: PropTypes.func,
  events: PropTypes.array,
}

const mapStateToProps = (state: Object): Object => ({
  user: state.user,
  events: state.events,
})

const mapDispatchToProps = (dispatch: Function) => ({
  addEvents: addEvents(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToDoHolder)
