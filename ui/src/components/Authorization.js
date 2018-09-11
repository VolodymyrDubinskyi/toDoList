import React from 'react';
import PropTypes from 'prop-types'
import {
  Button, FormControl, TextField, FormHelperText,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logIn } from '../actions/actions'


class Authorization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoNowEditting: false,
      loginValue: '',
      passwordValue: '',
      errorLogin: '',
    };
  }

  updateValue(e, inputName) {
    const newValue = {}
    newValue[inputName] = e.target.value
    this.setState(newValue);
  }

  checkLogin = () => {
    if (!this.state.loginValue) {
      this.setState({ errorLogin: 'Login must be filled out.' })
    } else if (this.state.loginValue.length < 6 || this.state.loginValue.length > 15) {
      this.setState({ errorLogin: 'Login must have more then 5 characters and not more then 14.' })
    } else {
      this.setState({ errorLogin: '' })
      return true
    }
    return false
  }

  checkPasswords = () => {
    if (!this.state.passwordValue) {
      this.setState({ errorPassword: 'Password must be filled out.' })
    } else if (this.state.passwordValue.length < 6 || this.state.passwordValue.length > 15) {
      this.setState({ errorPassword: 'Password must have more then 5 characters and not more then 14.' })
    } else {
      this.setState({ errorPassword: '' })
      return true
    }
    return false
  }

  tryAuthorize = (e) => {
    const goodLogin = this.checkLogin()
    const goodPassword = this.checkPasswords()

    if (goodLogin && goodPassword) {
      this.props.logIn(this.state.loginValue)
      this.props.tryAuthorize(this.state.loginValue, this.state.passwordValue)
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
            <Link to={`/user/${this.state.loginValue}`}>
              <Button
                style={{ fontSize: '12px' }}
                variant="contained" color="primary"
                onClick={this.tryAuthorize}
                className='authorizationFormSubmitBtn'>
                Go in
              </Button>
            </Link>
          </div>
        </div>
      </div>)
  }
}

Authorization.propTypes = {
  logIn: PropTypes.func.isRequired,
  tryAuthorize: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  logIn: name => dispatch(logIn(name)),
})

export default connect(
  null,
  mapDispatchToProps,
)(Authorization)
