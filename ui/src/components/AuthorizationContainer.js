import { webServer } from '../../../config/index'

export default class AuthorizationContainer {
  constructor(parent, listContainer, header) {
    this.parent = parent
    this.listContainer = listContainer
    this.nameExist = false;
    this.header = header;
    parent.appendChild(this.render())
    this.location = window.location.pathname;
    this.location = this.location.split('/')[this.location.split('/').length - 1]
    this.pathname = window.location.pathname;
    this.autoLogin();
    this.checkAnotherList();
    this.header.checkAnotherList = this.checkAnotherList
  }

  render = () => {
    this.elem = document.createElement('div')
    this.elem.className = 'authorizationHolder'

    this.title = document.createElement('h3')
    this.title.innerText = 'Authorization'
    this.title.className = 'authorizationTitle'

    this.form = document.createElement('div')
    this.form.className = 'authorizationForm'

    this.loginTitle = document.createElement('p')
    this.loginTitle.innerText = 'Login:'
    this.inputLogin = document.createElement('input')
    this.inputLogin.classList.add('authorizationFormInput')
    this.inputLogin.classList.add('authorizationFormLogin')

    this.passwordTitle = document.createElement('p')
    this.passwordTitle.innerText = 'Password:'
    this.inputPassword = document.createElement('input')
    this.inputPassword.type = 'password';
    this.inputPassword.classList.add('authorizationFormInput')
    this.inputPassword.classList.add('authorizationFormLogin')

    this.inputLogin.onkeypress = (e) => {
      if (e.keyCode === 13) {
        this.authorizeUser()
      }
    }
    this.inputPassword.onkeypress = (e) => {
      if (e.keyCode === 13) {
        this.authorizeUser()
      }
    }

    const submitBtnHolder = document.createElement('div')
    submitBtnHolder.classList.add('authorizationSubmitBtnHolder')
    submitBtnHolder.classList.add('clearfix')
    this.submitBtn = document.createElement('button')
    this.submitBtn.innerText = 'Go in'
    this.submitBtn.classList.add('btn-primary')
    this.submitBtn.classList.add('btn')
    this.submitBtn.classList.add('authorizationFormSubmitBtn')
    this.submitBtn.click = e => e.preventDefault()
    this.submitBtn.addEventListener('click', this.authorizeUser)

    submitBtnHolder.appendChild(this.submitBtn)

    this.elem.appendChild(this.title)
    this.elem.appendChild(this.form)

    this.form.appendChild(this.loginTitle)
    this.form.appendChild(this.inputLogin)
    this.form.appendChild(this.passwordTitle)
    this.form.appendChild(this.inputPassword)
    this.form.appendChild(submitBtnHolder)
    return this.elem
  }


  authorizeUser = () => {
    this.deleteErrorMessage();
    const catchErrorLogin = this.tryAuthorize();
    catchErrorLogin.then((result) => {
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', this.inputLogin.value)
      this.goToTodo()
      window.history.replaceState('', '', this.header.user);
    });
  }

  tryAuthorize = async () => {
    const checkExist = this.checkLoginPassword(this.inputLogin.value);
    const result = await checkExist;
    return result
  }

  checkLoginPassword = id => new Promise((resolve) => {
    const sendData = {
      password: this.inputPassword.value,
      login: this.inputLogin.value,
    }
    fetch(`http://${webServer.host}:${webServer.port}/users/${id}/login`, {
      method: 'POST',
      body: JSON.stringify(sendData),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    }).then(response => response.json())
      .then(resp => resolve(resp))
      .catch(() => {
        const errorMessagePassword = document.createElement('span');
        errorMessagePassword.innerText = 'Login or password incorrect.'
        errorMessagePassword.classList.add('errorMessage')
        this.loginTitle.appendChild(errorMessagePassword)
        // window.history.pushState(window.stateObj, '', `${this.header.user}`);
      })
  })

  deleteErrorMessage = () => {
    this.loginTitle.innerText = 'Login:'
  }

  goToTodo = () => {
    this.header.login();
    this.listContainer.getAllLists();
  }

  autoLogin = () => {
    if (localStorage.getItem('token') !== null) {
      this.header.login()
      if (this.location === '') {
        this.listContainer.getAllLists();
      }
    }
  }

  checkAnotherList = () => {
    let location = window.location.pathname;
    location = this.location.split('/')[this.location.split('/').length - 1]
    let { pathname } = window.location;
    if (location !== '') {
      // this.header.location.innerText = `${location}\`
      pathname = pathname.split('/')
      pathname.splice(0, 1)
      if (pathname.length === 1) {
        this.header.login();
        const sendData = {
          user: this.location,
        }
        fetch(`http://${webServer.host}:${webServer.port}/lists/${location}`, {
          method: 'post',
          body: JSON.stringify(sendData),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'X-Access-Token': localStorage.getItem('token'),
          },
        }).then(response => response.json())
          .then((resp) => {
            if (resp.commit !== undefined) {
              this.listContainer.addError(resp.commit)
            } else {
              this.header.userData = resp.userData
              this.header.user = resp.userData.user
              this.listContainer.addToDolistsList(resp.todoData)
              if (resp.ownAcc) {
                this.parent.classList.remove('notOwnAccount')
              } else {
                this.parent.classList.add('notOwnAccount')
              }
            }
          })
      } else if ((pathname.length === 3) && (pathname[1].toLowerCase() === 'todos')) {
        fetch(`http://${webServer.host}:${webServer.port}/lists/${pathname[0]}/todos/${pathname[2]}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'X-Access-Token': localStorage.getItem('token'),
          },
        }).then(response => response.json())
          .then((resp) => {
            if (resp.commit !== undefined) {
              this.listContainer.addError(resp.commit)
            } else {
              this.header.createHeaderTitle(pathname[2], resp.listInfo.title)
              this.listContainer.listInfo = resp.listInfo
              this.listContainer.addToDoElems(resp.todoData)
              this.header.goBackBtn.style.display = 'block'
              if (resp.ownAcc) {
                this.parent.classList.remove('notOwnAccount')
              } else {
                this.parent.classList.add('notOwnAccount')
              }
            }
          })
      }
    }
  }
}
