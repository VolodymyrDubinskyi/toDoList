import React from 'react';
import PropTypes from 'prop-types'
import {
  Button, FormControl, TextField, FormHelperText,
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { connect } from '../../react-myRedux'
import { logIn, tokenLogin } from '../actions/user'
import { getAllLists } from '../actions/lists'


export class Authorization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoNowEditting: false,
      loginValue: '',
      passwordValue: '',
      errorLogin: '',
    };
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      this.props.tokenLogin()
    }
  }

  componentDidUpdate() {
    if (this.props.user.name) {
      this.props.history.push(`/user/${this.props.user.name}`)
      if (this.props.lists.length === 0) this.props.getAllLists()
    }
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
      this.props.logIn({ name: this.state.loginValue, password: this.state.passwordValue })
      if (!localStorage.getItem('token')) this.setState({ errorPassword: 'Login or password incorrect.' })
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
  getAllLists: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
}

const mapDispatchToProps = dispatch => ({
  logIn: logIn(dispatch),
  getAllLists: getAllLists(dispatch),
  tokenLogin: tokenLogin(dispatch),
})

const mapStateToProps = state => ({
  user: state.user,
  lists: state.lists,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authorization))
