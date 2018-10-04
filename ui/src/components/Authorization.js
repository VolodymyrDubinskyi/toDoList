// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Button, FormControl, TextField, FormHelperText,
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications';

import type { callLogInParams } from '../actions/user'
import { logIn, tokenLogin } from '../actions/user'
import type { userProps, listsProps } from '../props'

type Props = {
  tokenLogin: () => void,
  user: userProps,
  history: Object,
  lists: Array<listsProps>,
  logIn: (callLogInParams) => void,
};
type State = {
  loginValue: string,
  todoNowEditting: boolean,
  passwordValue: string,
  errorLogin: string,
  errorPassword: string,
}

export class Authorization extends Component<Props, State> {
  constructor(props :Object) {
    super(props);
    this.state = {
      todoNowEditting: false,
      loginValue: '',
      passwordValue: '',
      errorLogin: '',
      errorPassword: '',
    };
  }

  createNotification = (type: string, head: string, info: string) => () => {
    switch (type) {
      case 'info':
        NotificationManager.info(head, info, 3000);
        break;
      case 'success':
        NotificationManager.success(head, info, 3000);
        break;
      case 'warning':
        NotificationManager.warning(head, info, 3000);
        break;
      case 'error':
        NotificationManager.error(head, info, 3000);
        break;
      default: return null
    }
    return null
  };

  componentWillMount() {// eslint-disable-line
    if (localStorage.getItem('token')) {
      this.props.tokenLogin()
    }
  }

  componentDidUpdate() {
    if (this.props.user.name) {
      this.props.history.push(`/user/${this.props.user.name}`)
    }
  }

  updateValue(e :Object, inputName :string) {
    const newValue = {}
    newValue[inputName] = e.target.value
    this.setState(newValue);
  }

  checkLogin = () => {
    if (!this.state.loginValue) {
      this.createNotification('warning', 'Warning', 'Login must be filled out.')()
    } else if (this.state.loginValue.length < 6 || this.state.loginValue.length > 15) {
      this.createNotification('warning', 'Warning', 'Login must have more then 5 characters and not more then 14.')()
    } else {
      return true
    }
    return false
  }

  checkPasswords = () => {
    if (!this.state.passwordValue) {
      this.createNotification('warning', 'Warning', 'Password must be filled out.')()
    } else if (this.state.passwordValue.length < 6 || this.state.passwordValue.length > 15) {
      this.createNotification('warning', 'Warning', 'Password must have more then 5 characters and not more then 14.')()
    } else {
      return true
    }
    return false
  }

  tryAuthorize = (e :Object) => {
    const goodLogin = this.checkLogin()
    const goodPassword = this.checkPasswords()

    if (goodLogin && goodPassword) {
      this.props.logIn({
        name: this.state.loginValue,
        password: this.state.passwordValue,
      })

      if (!localStorage.getItem('token') !== '') {
        this.createNotification('success', 'Welcome back', `${this.state.loginValue}`)()
      } else {
        this.createNotification('warning', 'Warning', 'Login or password incorrect.')()
      }
    } else {
      e.preventDefault()
    }
  }

  render() {
    return (
      <div className={'ReactAuthorization authorizationHolder'}>
        <h3 className={'authorizationTitle'}>{'Authorization'}</h3>
        <div className={'authorizationForm'}>
          <FormControl>
            <TextField
              fullWidth={true}
              style={{ margin: 0 }}
              label="Login:"
              value={this.state.loginValue}
              onChange={e => this.updateValue(e, 'loginValue')}
              margin="normal"
            />
            <FormHelperText style={{ color: 'red' }}>{this.state.errorLogin}</FormHelperText>
          </FormControl><br />
          <FormControl>
            <TextField
              fullWidth={true}
              type='password'
              style={{ margin: 0 }}
              label="Password:"
              value={this.state.passwordValue}
              onChange={e => this.updateValue(e, 'passwordValue')}
              margin="normal"
            />
            <FormHelperText style={{ color: 'red' }}>{this.state.errorPassword}</FormHelperText>
          </FormControl>
          <div className={'authorizationSubmitBtnHolder clearfix'}>
            <Button
              style={{ fontSize: '12px' }}
              variant="contained" color="primary"
              onClick={this.tryAuthorize}
              className='authorizationFormSubmitBtn'>
              Go in
              </Button>
          </div>
        </div>
      </div>)
  }
}

Authorization.propTypes = {
  logIn: PropTypes.func.isRequired,
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
  tokenLogin: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
}

const mapDispatchToProps = (dispatch: Function) => ({
  logIn: logIn(dispatch),
  tokenLogin: tokenLogin(dispatch),
})

const mapStateToProps = state => ({
  user: state.user,
  lists: state.lists,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authorization))
