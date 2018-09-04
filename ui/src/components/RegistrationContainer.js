import { webServer } from '../../../config/index'

export default class RegistrationContainer {
  constructor(parent, header) {
    this.parent = parent
    this.nameExist = false;
    this.header = header;

    parent.appendChild(this.render())
  }

  render = () => {
    this.elem = document.createElement('div')
    this.elem.className = 'registrationHolder'

    this.title = document.createElement('h3')
    this.title.innerText = 'Registration'
    this.title.className = 'registrationTitle'

    this.form = document.createElement('div')
    this.form.className = 'registrationForm'

    this.loginTitle = document.createElement('p')
    this.loginTitle.innerText = 'Login:'
    this.inputLogin = document.createElement('input')
    this.inputLogin.classList.add('registrationFormInput')
    this.inputLogin.classList.add('registrationFormLogin')

    this.passwordTitle = document.createElement('p')
    this.passwordTitle.innerText = 'Password:'
    this.inputPassword = document.createElement('input')
    this.inputPassword.type = 'password';
    this.inputPassword.classList.add('registrationFormInput')
    this.inputPassword.classList.add('registrationFormLogin')

    const passwordRepeatTitle = document.createElement('p')
    passwordRepeatTitle.innerText = 'Confirm password:'
    this.inputPasswordRepeat = document.createElement('input')
    this.inputPasswordRepeat.type = 'password';
    this.inputPasswordRepeat.classList.add('registrationFormInput')
    this.inputPasswordRepeat.classList.add('registrationFormLogin')

    const submitBtnHolder = document.createElement('div')
    submitBtnHolder.classList.add('registrationSubmitBtnHolder')
    submitBtnHolder.classList.add('clearfix')
    this.submitBtn = document.createElement('button')
    this.submitBtn.innerText = 'Registration'
    this.submitBtn.classList.add('btn-primary')
    this.submitBtn.classList.add('btn')
    this.submitBtn.classList.add('registrationFormSubmitBtn')
    this.submitBtn.click = e => e.preventDefault()
    this.submitBtn.addEventListener('click', this.registerUser)

    submitBtnHolder.appendChild(this.submitBtn)

    this.elem.appendChild(this.title)
    this.elem.appendChild(this.form)

    this.form.appendChild(this.loginTitle)
    this.form.appendChild(this.inputLogin)
    this.form.appendChild(this.passwordTitle)
    this.form.appendChild(this.inputPassword)
    this.form.appendChild(passwordRepeatTitle)
    this.form.appendChild(this.inputPasswordRepeat)
    this.form.appendChild(submitBtnHolder)
    return this.elem
  }


  registerUser = () => {
    this.deleteErrorMessage();
    const catchErrorPassword = this.checkPasswords()
    if (catchErrorPassword) {
      const errorMessagePassword = document.createElement('span');
      errorMessagePassword.innerText = catchErrorPassword
      errorMessagePassword.classList.add('errorMessage')
      this.passwordTitle.appendChild(errorMessagePassword)
    }

    const catchErrorLogin = this.checkLogin();
    catchErrorLogin.then((result) => {
      if (result) {
        const errorMessagePassword = document.createElement('span');
        errorMessagePassword.innerText = result
        errorMessagePassword.classList.add('errorMessage')
        this.loginTitle.appendChild(errorMessagePassword)
      }

      if (!result && !catchErrorPassword) {
        this.addUserToDB()
      }
    });
  }

  checkPasswords = () => {
    if (this.inputPasswordRepeat.value !== this.inputPassword.value) {
      return 'Your password and confirmation password do not match.'
    }
    if (!this.inputPassword.value) {
      return 'Password must be filled out.'
    }
    if (this.inputPassword.value.length < 6 || this.inputPassword.value.length > 15) {
      return 'Password must have more then 5 characters and not more then 14.'
    }

    return null
  }

  checkLogin = async () => {
    if (!this.inputLogin.value) {
      return 'Login must be filled out.'
    }
    if (this.inputLogin.value.length < 6 || this.inputLogin.value.length > 15) {
      return 'Login must have more then 5 characters and not more then 14.'
    }
    const checkExist = this.checkLoginIsNotCreated(this.inputLogin.value);
    const result = await checkExist;

    if (result) {
      return 'Such login allredy exist.'
    }

    return null
  }

  deleteErrorMessage = () => {
    this.loginTitle.innerText = 'Login:'
    this.passwordTitle.innerHTML = 'Password:'
  }


  checkLoginIsNotCreated = id => new Promise((resolve) => {
    fetch(`http://${webServer.host}:${webServer.port}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    }).then(response => response.json())
      .then(resp => resolve(resp.exist))
      .catch(console.error);
  })


  addUserToDB = () => {
    const sendData = {
      user: this.inputLogin.value,
      password: this.inputPassword.value,
    }

    fetch(`http://${webServer.host}:${webServer.port}/users/`, {
      method: 'POST',
      body: JSON.stringify(sendData),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    })
      .then(this.goToTodo)
      .catch(console.error);
  }

  goToTodo = () => {
    this.header.authorization();
  }
}
