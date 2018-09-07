import React from 'react';
import PropTypes from 'prop-types'
import {
  Button, TextField,
  FormControl, FormHelperText,
} from '@material-ui/core'

export default class ReactToDoList extends React.Component {
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

  updateValue(e, inputName) {
    const newValue = {}
    newValue[inputName] = e.target.value
    this.setState(newValue);
  }

  checkLoginExisting() {
    return this.props.checkLoginExisting(this.state.loginValue)
  }

  checkLogin = () => {
    const loginExist = this.checkLoginExisting()
    if (!this.state.loginValue) {
      this.setState({ errorLogin: 'Login must be filled out.' })
    } else if (this.state.loginValue.length < 6 || this.state.loginValue.length > 15) {
      this.setState({ errorLogin: 'Login must have more then 5 characters and not more then 14.' })
    } else if (loginExist) {
      this.setState({ errorLogin: 'Login already exist' })
    } else {
      this.setState({ errorLogin: '' })
      return true
    }
    return false
  }

  checkPasswords = () => {
    if (this.state.passwordValue !== this.state.confirmPasswordValue) {
      this.setState({ errorPassword: 'Your password and confirmation password do not match.' })
    } else if (!this.state.passwordValue) {
      this.setState({ errorPassword: 'Password must be filled out.' })
    } else if (this.state.passwordValue.length < 6 || this.state.passwordValue.length > 15) {
      this.setState({ errorPassword: 'Password must have more then 5 characters and not more then 14.' })
    } else {
      this.setState({ errorPassword: '' })
      return true
    }
    return false
  }

  registerUser = () => {
    const goodLogin = this.checkLogin()
    const goodPassword = this.checkPasswords()

    if (goodLogin && goodPassword) {
      this.props.createNewUser(this.state.loginValue, this.state.passwordValue)
    }
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
          </FormControl><br/>
          <FormControl>
            <TextField
              style={{ margin: 0 }}
              label="Password:"
              value={this.state.passwordValue}
              onChange={e => this.updateValue(e, 'passwordValue')}
              margin="normal"
            />
            <FormHelperText style={{ color: 'red' }}>{this.state.errorPassword}</FormHelperText>
          </FormControl><br/>
          <TextField
            style={{ margin: 0 }}
            label="Confirm password:"
            value={this.state.confirmPasswordValue}
            onChange={e => this.updateValue(e, 'confirmPasswordValue')}
            margin="normal"
          />
          <div className={'authorizationSubmitBtnHolder clearfix'}>
            <Button className='authorizationFormSubmitBtn'
              style={{ fontSize: '12px' }}
              variant="contained" color="primary"
              onClick={this.registerUser}>
              Registration
          </Button>
          </div>
        </div>
      </div>)
  }
}

ReactToDoList.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  checkLoginExisting: PropTypes.func.isRequired,
}
