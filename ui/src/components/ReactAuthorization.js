import React from 'react';
import PropTypes from 'prop-types'
import {
  Button, FormControl, TextField, FormHelperText,
} from '@material-ui/core'

export default class ReactToDoList extends React.Component {
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

  tryAuthorize = () => {
    this.props.tryAuthorize(this.state.loginValue, this.state.passwordValue)
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
            <FormHelperText style={{ color: 'red' }}>{}</FormHelperText>
          </FormControl><br/>
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
            <FormHelperText style={{ color: 'red' }}>{}</FormHelperText>
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

ReactToDoList.propTypes = {
  tryAuthorize: PropTypes.func.isRequired,
}
