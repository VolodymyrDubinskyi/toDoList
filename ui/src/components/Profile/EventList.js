// @flow
import {
  withRouter, Link,
} from 'react-router-dom'
import React from 'react';

type Props = {
  events: Array<Object>,
};

type State = {}

class EventList extends React.Component<Props, State> {
  getFormatedDate = (time) => {
    const eventTime = new Date(time)
    const monthNames = ['Jan', 'Febr', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
    ];
    return `${eventTime.getDate()} ${monthNames[eventTime.getMonth()]} at ${eventTime.getHours()}:${eventTime.getMinutes()}`
  }

  render() {
    const eventComponents = this.props.events.map((event, i) => <div
      key={`event item ${i}`}
      style={{
        marginLeft: 40,
        padding: '12px 0',
        minHeight: 35,
        position: 'relative',
        borderBottom: '1px solid rgba(9,45,66,.13)',
      }}>

      <div key={`User with access ${event.userName}`} style={{
        display: 'inline-block',
        cursor: 'pointer',
        position: 'absolute',
        left: -40,
        top: 12,
        backgroundColor: 'rgb(220, 220, 220)',
      }}
        className='headerUsers'>
        <div className='headerUsersHolder' />
        <div>
          {(event.userName) ? event.userName[0].toUpperCase() : <img
            src={'/anon.png'} alt="Not authorized user" className='avatarImage' />}
        </div>
      </div>

      <div style={{
        lineHeight: '20px',
      }}>
        <span style={{
          fontWeight: 700,
          fontSize: 14,
        }}>{event.userName}</span>
        {` ${event.event} to `}
        <Link to={`/user/${event.userName}/board/${event.boardId}`}
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: '#17394d',
          }}>{event.boardId}</Link>
      </div>
      <div style={{
        fontSize: 12,
        color: '#6b808c',
        lineHeight: '20px',
        fontWeight: 400,
      }}>
        {this.getFormatedDate(this.props.events[0].createdAt)}{' - on board '}
        <Link to={`/user/${event.userName}/board/${event.boardId}`}
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: '#17394d',
          }}>{event.boardId}</Link>
      </div>
      <div>

      </div>

    </div >)
    return <div
      style={{
        minWidth: '100%',
      }}>
      {[...eventComponents]}
    </div>
  }
}


export default withRouter(EventList)
