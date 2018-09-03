import AddToDoComponent from './AddToDoComponent'
import ListComponent from './ListComponent'
import ToDoListsList from './ToDoListsList'

export default class ListContainer {
  constructor(parent, header) {
    this.todos = []
    this.parent = parent
    parent.appendChild(this.render())
    this.header = header;
    this.header.goBackBtn.addEventListener('click', this.getAllLists)
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
    // this.list.appendChild(this.addTodoComponent.render())
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
    const { listTitle } = this
    fetch(`http://127.0.0.1:3000/todos/${listTitle}`, {
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
      .then((todos) => {
        this.addToDoElems(todos)
      })
  }

  createToDo = () => {
    const { listTitle } = this
    const { value } = this.addTodoComponent.input
    const sendData = {
      title: value,
      listTitle,
      stage: false,
    }

    fetch('http://127.0.0.1:3000/todos/', {
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
    fetch(`http://127.0.0.1:3000/todos/${id}/${listTitle}`, {
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

    fetch(`http://127.0.0.1:3000/todos/${id}/${listTitle}`, {
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

    fetch(`http://127.0.0.1:3000/todos/${id}/${listTitle}`, {
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
    console.log(err)
    this.error = document.createElement('p')
    this.error.classList.add('errorMessage')
    this.error.innerText = err
    this.list.appendChild(this.error)
  }

  addToDoElems = (arr) => {
    this.list.innerHTML = ''
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
    this.list.appendChild(this.addNewListBtn)
  }

  goToList = (listTitle) => {
    this.listTitle = listTitle
    this.getAllToDos()
  }

  createNewList = () => {
    fetch('http://127.0.0.1:3000/lists', {
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
    fetch('http://127.0.0.1:3000/lists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'X-Access-Token': localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then((lists) => {
        this.addToDolistsList(lists)
      })
  }

  deleteList = (id) => {
    const sendData = {
      id,
    }

    fetch('http://127.0.0.1:3000/lists', {
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
}
