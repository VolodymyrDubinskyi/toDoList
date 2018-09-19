import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import {
  withRouter, Link, Route, Switch,
} from 'react-router-dom'
import { connect } from '../../react-myRedux'
import logOut from '../actions/actions'
import { editList } from '../actions/lists'
import { editUser } from '../actions/user'


export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleEdit: false,
      editValue: '',
    };
  }

  editTitle = () => {
    this.setState({
      titleEdit: true,
      editValue: this.props.lists.filter(elem => elem.id === this.props.user.currentList)[0].title,
    });
  }


  updateValue(e) {
    this.setState({
      editValue: e.target.value,
    });
  }


  changeTitle = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        titleEdit: false,
      });
      const changes = {
        title: this.state.editValue,
      }

      this.props.editList({
        name: this.props.user.name,
        id: this.props.user.currentList,
        changes,
      })
    }
  }

  stopEditing = () => {
    this.props.editUser({
      name: this.props.user.name,
      id: this.props.user.id,
      changes: {
        currentList: '',
      },
    })
    this.setState({
      titleEdit: false,
      editValue: '',
    });
  }

  render() {
    // console.log(this.props.state)
    const editTitle = <Switch>
      <Route exact path='/user/:name/list/:listId' component={() => (
        <span style={this.state.titleEdit ? { display: 'none' } : {
          color: 'black',
          display: 'inline-block',
          margin: 5,
          ontSize: '0.7em',
          fontStyle: 'italic',
          cursor: 'pointer',
        }}
          onClick={this.editTitle}
        >edit</span>)} />
      <Route exact path='/user/:name' component={() => ('')} />
    </Switch>

    const editField = <TextField
      style={(this.state.titleEdit ? { margin: 0 } : { display: 'none', margin: 0 })}
      value={this.state.editValue}
      onChange={e => this.updateValue(e)}
      margin="normal"
      onKeyDown={e => this.changeTitle(e)}
    />

    return (
      <div className={'header'}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Switch>
            <Route exact path="/registration" component={() => (
              <Link to={'/authorization'}>
                <Button variant="contained" color="primary"
                  style={{ float: 'right', fontSize: '15px' }}
                  className='headerButton'>
                  Authorization
                </Button>
              </Link>)} />
            <Route exact path='/authorization' component={() => (
              < Link to={'/registration'}>
                <Button variant="contained" color="primary"
                  style={{ float: 'right', fontSize: '15px' }}
                  className='headerButton'>
                  Registration
                </Button>
              </Link>)} />
            <Route component={() => (<><Link to={'/authorization'}>
              <Button variant="contained" color="primary"
                style={{ float: 'right', fontSize: '15px' }}
                onClick={() => {
                  this.props.logOut()
                  localStorage.removeItem('token')
                }}
                className='headerButton'>
                Log Out
                </Button>
            </Link><Route exact path='/user/:name/list/:title' component={({ match }) => (
              <Link to={`/user/${match.params.name}`}>
                <Button variant="contained" color="primary"
                  style={{ float: 'right', fontSize: '15px' }}
                  onClick={this.stopEditing}
                  className='headerButton'>
                  {'Back'}
                </Button>
              </Link>)} /></>)} />
          </Switch>
          <Route exact path='/user/:name/list/:title' component={({ match }) => (
            <span className='headerInfo'>
              <span>{match.params.name}/</span>
              <span style={(this.state.titleEdit) ? {
                display: 'none',
              } : {}}>{
                  (this.props.user.currentList) ? this.props.lists.filter(
                    obj => obj.id === match.params.title,
                  )[0].title : null
                }</span>
            </span>
          )
          } />
          <Route exact path='/user/:name' component={({ match }) => (
            <span className='headerInfo'>{match.params.name}</span>
          )} />
          {editTitle}{editField}
        </div>
      </div >
    )
  }
}

Header.propTypes = {
  editList: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  lists: PropTypes.array.isRequired,
}


const mapStateToProps = state => ({
  user: state.user,
  lists: state.lists,
  state,
})

const mapDispatchToProps = dispatch => ({
  editUser: editUser(dispatch),
  logOut: () => dispatch(logOut()),
  editList: editList(dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
