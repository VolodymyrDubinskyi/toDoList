export default class Header {
  constructor(parent) {
    this.parent = parent
    this.stage = 'authorization'
    this.user = ''
    parent.appendChild(this.render())
  }

  render = () => {
    this.elem = document.createElement('header')
    this.elem.className = 'header'
    this.elem.classList.add('clearfix')

    this.location = document.createElement('p')
    this.location.classList.add('headerInfo')
    this.location.innerText = localStorage.getItem('user') || '';

    this.button = document.createElement('button')
    this.button.classList.add('headerButton')
    this.button.classList.add('btn-primary')
    this.button.classList.add('btn')
    this.button.innerText = 'Registration'
    this.button.addEventListener('click', () => {
      switch (this.stage) {
        case 'authorization': this.registration(); break;
        case 'registration': this.authorization(); break;
        case 'todo': this.logout(); break;
        default: console.error('something go wrong')
      }
    })

    this.goBackBtn = document.createElement('button')
    this.goBackBtn.classList.add('headerButton')
    this.goBackBtn.classList.add('btn-primary')
    this.goBackBtn.classList.add('btn')
    this.goBackBtn.style.display = 'none'
    this.goBackBtn.innerText = 'Back'
    this.goBackBtn.addEventListener('click', () => {
      this.listTitle.remove()
      this.edit.remove()
      this.goBackBtn.style.display = 'none'
      if (this.titleEditing) this.titleEditing.remove()
    })

    this.elem.appendChild(this.button)
    this.elem.appendChild(this.goBackBtn)
    this.elem.appendChild(this.location)
    return this.elem
  }


  logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.location.innerText = ''
    document.getElementsByClassName('main')[0].style.display = 'none'
    document.getElementsByClassName('registrationHolder')[0].style.display = 'none'
    document.getElementsByClassName('authorizationHolder')[0].style.display = 'block'
    this.button.innerText = 'Registration'
    this.stage = 'authorization'
  }

  registration = () => {
    document.getElementsByClassName('main')[0].style.display = 'none'
    document.getElementsByClassName('authorizationHolder')[0].style.display = 'none'
    document.getElementsByClassName('registrationHolder')[0].style.display = 'block'
    this.button.innerText = 'Authorization'
    this.stage = 'registration'
  }

  authorization = () => {
    document.getElementsByClassName('main')[0].style.display = 'none'
    document.getElementsByClassName('registrationHolder')[0].style.display = 'none'
    document.getElementsByClassName('authorizationHolder')[0].style.display = 'block'
    this.button.innerText = 'Registration'
    this.stage = 'authorization'
  }

  login = () => {
    document.getElementsByClassName('authorizationHolder')[0].style.display = 'none'
    document.getElementsByClassName('registrationHolder')[0].style.display = 'none'
    document.getElementsByClassName('main')[0].style.display = 'block'
    this.button.innerText = 'Log out'
    this.stage = 'todo'
    this.location.innerText = localStorage.getItem('user') + '/'
  }

  changeName = () => {
    this.listTitle.style.display = 'none';
    this.edit.style.display = 'none';
    this.titleEditing = document.createElement('input')
    this.titleEditing.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.changeNameConfirm(this.listID, this.titleEditing.value)
        this.titleEditing.remove()
        this.listTitle.innerText = this.titleEditing.value
        this.listTitle.style.display = '';
        this.edit.style.display = '';
      }
    })

    this.location.appendChild(this.titleEditing)
  }

  changeNameConfirm = (id, value) => {
    const sendData = {
      id,
      value,
    }

    fetch('http://127.0.0.1:3000/lists', {
      method: 'PATCH',
      body: JSON.stringify(sendData),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'X-Access-Token': localStorage.getItem('token'),
      },
    })
      .then(this.getAllLists)
  }
}
