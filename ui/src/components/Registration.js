// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Button, TextField,
  FormControl, FormHelperText,
} from '@material-ui/core'
import { NotificationManager } from 'react-notifications';

import { Link, withRouter } from 'react-router-dom'
import config from '../../config'

const { webServer } = config

type Props = {
  history: Object,
};
type State = {
  todoNowEditting: boolean,
  loginValue: string,
  passwordValue: string,
  confirmPasswordValue: string,
  errorPassword: string,
  errorLogin: string,
}

class Registration extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      todoNowEditting: false,
      loginValue: '',
      passwordValue: '',
      confirmPasswordValue: '',
      errorPassword: '',
      errorLogin: '',
    };
  }

  createNotification = (type, head, info) => () => {
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

  updateValue(e, inputName: string) {
    const newValue = {}
    newValue[inputName] = e.target.value
    this.setState(newValue);
  }


  checkLogin = () => fetch(
    `http://${webServer.host}:${webServer.port}/users/${this.state.loginValue}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    },
  ).then(response => response.json())
    .then((responce) => {
      if (!this.state.loginValue) {
        this.createNotification('warning', 'Warning', 'Login must be filled out.')()
      } else if (this.state.loginValue.length < 6 || this.state.loginValue.length > 15) {
        this.createNotification('warning', 'Warning', 'Login must have more then 5 characters and not more then 14.')()
      } else if (responce.exist) {
        this.createNotification('warning', 'Warning', 'Login already exist')()
      }
      return responce
    })

  checkPasswords = () => {
    if (!this.state.passwordValue) {
      this.createNotification('warning', 'Warning', 'Password must be filled out.')()
    } else if (this.state.passwordValue.length < 6 || this.state.passwordValue.length > 15) {
      this.createNotification('warning',
        'Warning',
        'Password must have more then 5 characters and not more then 14.')()
    } else if (this.state.passwordValue !== this.state.confirmPasswordValue) {
      this.createNotification('warning', 'Warning', 'Your password and confirmation password do not match.')()
    } else {
      this.setState({ errorPassword: '' })
      return true
    }
    return false
  }

  registerUser = (e) => {
    const login = this.checkLogin()
    const goodPassword = this.checkPasswords()
    e.preventDefault()

    login.then((responce) => {
      if (!responce.exist && goodPassword) {
        fetch(
          `http://${webServer.host}:${webServer.port}/users/`,
          {
            method: 'POST',
            body: JSON.stringify({
              user: this.state.loginValue,
              password: this.state.passwordValue,
            }),
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': '*',
            },
          },
        )
          .then(() => {
            this.createNotification('success', 'Profile Created', '')()
            this.props.history.push('/authorization')
          })
      }
    })
  }

  render() {
    return (
      <div className={'ReactRegistration authorizationHolder'}>
        <h3 className={'authorizationTitle'}>Registration</h3>
        <div className={'authorizationForm'}>
          <FormControl>
            <TextField
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
              style={{ margin: 0 }}
              label="Password:"
              type='password'
              value={this.state.passwordValue}
              onChange={e => this.updateValue(e, 'passwordValue')}
              margin="normal"
            />
            <FormHelperText style={{ color: 'red' }}>{this.state.errorPassword}</FormHelperText>
          </FormControl><br />
          <TextField
            style={{ margin: 0 }}
            type='password'
            label="Confirm password:"
            value={this.state.confirmPasswordValue}
            onChange={e => this.updateValue(e, 'confirmPasswordValue')}
            margin="normal"
          />
          <div className={'authorizationSubmitBtnHolder clearfix'}>
            <Link to='/authorization'>
              <Button className='authorizationFormSubmitBtn'
                style={{ fontSize: '12px' }}
                variant="contained" color="primary"
                onClick={this.registerUser}>
                Registration
              </Button>
            </Link>
          </div>
        </div>
      </div>)
  }
}

Registration.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(Registration)
