import { webServer } from '../../../config/index'

export default class ToDoListsList {
  constructor(title, goToList, header, id, deleteList) {
    this.title = title
    this.header = header
    this.deleteList = deleteList
    this.goToList = goToList
    this.id = id
  }

  render = () => {
    this.elem = document.createElement('div')
    this.elem.className = 'ToDoListsListElem'

    this.listName = document.createElement('p')
    this.listName.innerText = this.title
    this.listName.className = 'ToDoListsListName'
    this.listName.addEventListener('click', (e) => {
      if (e.target.tagName !== 'P') return
      window.history.pushState(null, null, `http://localhost:${webServer.port}/${this.header.user}/todos/${this.id}`)
      this.goToList(this.id)
      this.header.createHeaderTitle(this.id, this.title)
    })

    this.delete = document.createElement('span');
    this.delete.classList.add('deleteList');
    this.delete.innerText = 'del';
    this.delete.addEventListener('click', () => {
      this.deleteList(this.id)
    })
    this.delete.classList.add('onlyOwnPropretty')

    this.elem.appendChild(this.listName)
    this.listName.appendChild(this.delete)
    return this.elem
  }
}
