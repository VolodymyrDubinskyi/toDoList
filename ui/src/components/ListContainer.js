import AddToDoComponent from './AddToDoComponent'
import ListComponent from './ListComponent'
import ToDoListsList from './ToDoListsList'
import { webServer } from '../../../config/index'

export default class ListContainer {
  constructor(parent, header) {
    this.parent = parent
    this.todos = []
    this.parent = parent
    parent.appendChild(this.render())
    this.header = header;
    this.header.goBackBtn.addEventListener('click', this.getAllLists)
    this.listTitle = window.location.pathname.split('/')[3] || ''
  }

  render = () => {
    this.elem = document.createElement('div')
    this.elem.className = 'main'

    this.title = document.createElement('p')
    this.title.innerText = 'Todo List'
    this.title.className = 'mainTitle'

    this.list = document.createElement('div')
    this.list.className = 'list'

    this.elem.appendChild(this.title)
    this.elem.appendChild(this.list)
    this.addTodoComponent = new AddToDoComponent(this.createToDo)
    return this.elem
  }

  removeToDo = (id) => {
    this.removeToDoInDB(id)
  }

  changeStageToDo = (e, id, elem) => {
    const component = elem
    const { target } = e
    if (target.classList.contains('editing')) {
      return
    }
    component.getElementsByClassName('listEventToggle')[0].checked = !component.getElementsByClassName('listEventToggle')[0].checked
    component.classList.toggle('chosen')
    this.changeStageToDoinDB(target.parentNode.parentNode.getElementsByClassName('listEventToggle')[0].checked, id)
  }

  changeStageToDoWithToggle = (e, id) => {
    const { target } = e
    target.parentNode.classList.toggle('chosen')
    this.changeStageToDoinDB(target.checked, id)
  }

  changeStageToDoInTimeOfBuild = (elem) => {
    const target = elem
    target.toggle.checked = !target.toggle.checked
    target.elem.classList.toggle('chosen')
  }

  editToDo = (e) => {
    const { target } = e
    const usual = target.parentNode.parentNode.parentNode.getElementsByClassName('usual')[0]
    const editing = target.parentNode.parentNode.parentNode.getElementsByClassName('editing')[0]
    const listTarget = target.parentNode.parentNode.getElementsByClassName('eventToDoInfo')[0]
    const oldData = listTarget.innerText
    usual.style.display = 'none';
    editing.style.display = 'block';
    editing.getElementsByClassName('editorInput')[0].value = oldData
    this.oldData = oldData
  }

  stopEdit = (e) => {
    e.target.parentNode.parentNode.parentNode.getElementsByClassName('usual')[0].style.display = ''
    e.target.parentNode.parentNode.parentNode.getElementsByClassName('editing')[0].style.display = ''
  }

  saveEditWithEnter = (elem, id) => {
    const listItem = elem
    listItem.getElementsByClassName('usual')[0].style.display = ''
    listItem.getElementsByClassName('editing')[0].style.display = ''
    const newData = listItem.getElementsByClassName('editorInput')[0].value
    this.editToDoInDB(newData, id)
    listItem.getElementsByClassName('eventToDoInfo')[0].innerText = newData
  }

  saveEdit = (e, id) => {
    const usual = e.target.parentNode.parentNode.parentNode.getElementsByClassName('usual')[0]
    const editing = e.target.parentNode.parentNode.parentNode.getElementsByClassName('editing')[0]
    usual.style.display = '';
    editing.style.display = '';
    const newData = editing.getElementsByClassName('editorInput')[0].value
    this.editToDoInDB(newData, id)
    usual.getElementsByClassName('eventToDoInfo')[0].innerText = newData
  }

  getAllToDos = () => {
    if (this.listTitle) this.header.checkAnotherList()
    else {
      const { listTitle } = this
      fetch(`http://${webServer.host}:${webServer.port}/todos/${listTitle}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'X-Access-Token': localStorage.getItem('token'),
        },
      })
        .then((response) => {
          const newResponse = response.json();
          return newResponse;
        })
        .then((resp) => {
          if (resp.ownAcc) {
            this.parent.classList.remove('notOwnAccount')
          } else {
            this.parent.classList.add('notOwnAccount')
          }
          this.listInfo = resp.listInfo
          this.addToDoElems(resp.todoData)
          window.history.pushState(null, null, `http://localhost:${webServer.port}/${this.header.user}/todos/${this.header.listID}`)
        })
    }
  }

  createToDo = () => {
    const { listTitle } = this
    const { value } = this.addTodoComponent.input
    const sendData = {
      title: value,
      listTitle,
      stage: false,
    }

    fetch(`http://${webServer.host}:${webServer.port}/todos/`, {
      method: 'POST',
      body: JSON.stringify(sendData),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'X-Access-Token': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        const { status } = response
        if (status !== 401) {
          this.getAllToDos()
        } else {
          localStorage.removeItem('token')
          this.header.authorization()
        }
      })
  }

  removeToDoInDB = (id) => {
    const { listTitle } = this
    const sendData = {
      listTitle,
    }
    fetch(`http://${webServer.host}:${webServer.port}/todos/${id}/${listTitle}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'X-Access-Token': localStorage.getItem('token'),
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => {
        const { status } = response
        if (status !== 401) {
          this.getAllToDos()
        } else {
          localStorage.removeItem('token')
          this.header.authorization()
        }
      })
  }

  editToDoInDB = (newValue, id) => {
    const { listTitle } = this
    const sendData = {
      title: newValue,
      listTitle,
    }

    fetch(`http://${webServer.host}:${webServer.port}/todos/${id}/${listTitle}`, {
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
      .then((response) => {
        const { status } = response
        if (status !== 401) {
          this.getAllToDos()
        } else {
          localStorage.removeItem('token')
          this.header.authorization()
        }
      })
  }

  changeStageToDoinDB = (newValue, id) => {
    const { listTitle } = this
    const sendData = {
      stage: newValue,
      listTitle,
    }

    fetch(`http://${webServer.host}:${webServer.port}/todos/${id}/${listTitle}`, {
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
      .then((response) => {
        const { status } = response
        if (status !== 401) {
          this.getAllToDos()
        } else {
          localStorage.removeItem('token')
          this.header.authorization()
        }
      })
  }

  addError = (err) => {
    const oldError = document.getElementsByClassName('errorMessage')[0]
    if (oldError) oldError.remove()
    this.error = document.createElement('p')
    this.error.classList.add('errorMessage')
    this.error.innerText = err
    this.list.appendChild(this.error)
  }

  addToDoElems = (arr) => {
    this.list.innerHTML = ''

    this.toggleHolder = document.createElement('div')
    this.toggleHolder.classList.add('toggleListHolder')
    this.toggleHolderTitle = document.createElement('span')
    this.toggleHolderTitle.classList.add('toggleHolderTitle')
    this.toggleHolderTitle.innerText = 'Visible to other users:'
    this.toggle = document.createElement('input')
    this.toggle.type = 'checkbox'
    if (this.listInfo) this.toggle.checked = this.listInfo.visibility
    this.toggle.classList.add('visibilityToggle')
    this.toggleHolder.appendChild(this.toggle)
    this.toggleHolder.appendChild(this.toggleHolderTitle)
    this.list.appendChild(this.toggleHolder)
    this.toggleHolder.classList.add('onlyOwnPropretty')

    this.toggle.addEventListener('click', () => {
      this.header.changeConfirm(this.listInfo['_id'], { visibility: this.toggle.checked })
    })

    this.todos = arr
    arr.forEach((obj) => {
      const newListItem = new ListComponent(obj['_id'],
        obj.stage,
        obj.title,
        this.removeToDo,
        this.editToDo,
        this.stopEdit,
        this.saveEdit,
        this.saveEditWithEnter,
        this.changeStageToDoWithToggle,
        this.changeStageToDo)
      this.list.appendChild(newListItem.render())
      if (obj.stage) {
        this.changeStageToDoInTimeOfBuild(newListItem)
      }
    })
    const addTodoComponent = this.addTodoComponent.render()
    this.list.appendChild(addTodoComponent)
    addTodoComponent.getElementsByClassName('todoItemValue')[0].focus()
    this.header.goBackBtn.style.display = ''
  }

  addToDolistsList = (arr) => {
    this.list.innerHTML = ''

    this.userToggleHolder = document.createElement('div')
    this.userToggleHolder.classList.add('toggleUserHolder')
    this.userToggleTitle = document.createElement('span')
    this.userToggleTitle.classList.add('toggleHolderTitle')
    this.userToggleTitle.innerText = 'Visible to other users:'
    this.userToggle = document.createElement('input')
    this.userToggle.type = 'checkbox'
    this.userToggle.checked = this.header.userData.visibility || false
    this.userToggle.classList.add('visibilityToggle')
    this.userToggleHolder.appendChild(this.userToggle)
    this.userToggleHolder.appendChild(this.userToggleTitle)
    this.list.appendChild(this.userToggleHolder)
    this.userToggleHolder.classList.add('onlyOwnPropretty')

    this.userToggle.addEventListener('click', () => {
      this.changeUserData(this.header.userData['_id'], { visibility: this.userToggle.checked })
    })

    arr.forEach((obj) => {
      const { title, _id } = obj
      const list = new ToDoListsList(title, this.goToList, this.header, _id, this.deleteList)
      this.list.appendChild(list.render())
    })
    this.addNewListBtn = document.createElement('button')
    this.addNewListBtn.classList.add('btn')
    this.addNewListBtn.classList.add('btn-primary')
    this.addNewListBtn.innerText = 'Create new list'
    this.addNewListBtn.addEventListener('click', this.createNewList)
    this.addNewListBtn.classList.add('onlyOwnPropretty')
    this.list.appendChild(this.addNewListBtn)
  }

  goToList = (listTitle) => {
    this.listTitle = listTitle
    this.getAllToDos()
  }

  createNewList = () => {
    fetch(`http://${webServer.host}:${webServer.port}/lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'X-Access-Token': localStorage.getItem('token'),
      },
    }).then(this.getAllLists)
  }


  getAllLists = () => {
    if (this.listTitle) this.header.checkAnotherList()
    else {
      fetch(`http://${webServer.host}:${webServer.port}/lists`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'X-Access-Token': localStorage.getItem('token'),
        },
      }).then(response => response.json())
        .then((resp) => {
          if (resp.ownAcc) {
            this.parent.classList.remove('notOwnAccount')
          } else {
            this.parent.classList.add('notOwnAccount')
          }
          this.header.userData = resp.userData
          this.header.user = resp.userData.user
          this.addToDolistsList(resp.todoData)
          window.history.pushState(null, null, `http://localhost:${webServer.port}/${this.header.user}`)
        })
    }
  }

  deleteList = (id) => {
    const sendData = {
      id,
    }

    fetch(`http://${webServer.host}:${webServer.port}/lists`, {
      method: 'DELETE',
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

  changeUserData = (user, changes) => {
    const sendData = {
      user,
      changes,
    }
    fetch(`http://${webServer.host}:${webServer.port}/users/${this.header.user}`, {
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
      .catch(console.error);
  }
}
