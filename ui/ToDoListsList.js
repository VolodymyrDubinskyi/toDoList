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
      this.goToList(this.id)
      this.header.listID = this.id
      this.header.listTitle = document.createElement('span')
      this.header.edit = document.createElement('span')
      this.header.listTitle.innerText = this.title
      this.header.edit.innerText = 'edit'
      this.header.edit.classList.add('editListName')
      this.header.edit.addEventListener('click', this.header.changeName)

      this.header.location.appendChild(this.header.listTitle)
      this.header.location.appendChild(this.header.edit)
    })

    this.delete = document.createElement('span');
    this.delete.classList.add('deleteList');
    this.delete.innerText = 'del';
    this.delete.addEventListener('click', () => {
      this.deleteList(this.id)
    })

    this.elem.appendChild(this.listName)
    this.listName.appendChild(this.delete)
    return this.elem
  }
}
