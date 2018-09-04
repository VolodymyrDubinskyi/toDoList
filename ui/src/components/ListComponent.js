export default class ListComponent {
  constructor(id,
    stage,
    eventInfo,
    removeTodo,
    editTodo,
    stopEdit,
    saveEdit,
    saveEditWithEnter,
    changeStageToDoWithToggle,
    changeStageToDo) {
    this.id = id
    this.stage = stage
    this.eventInfo = eventInfo
    this.elem = this.render()
    this.removeTodo = removeTodo
    this.editTodo = editTodo
    this.stopEdit = stopEdit
    this.saveEdit = saveEdit
    this.changeStageToDo = changeStageToDo
    this.changeStageToDoWithToggle = changeStageToDoWithToggle
    this.saveEditWithEnter = saveEditWithEnter
  }

  render = () => {
    this.elem = document.createElement('div')
    this.elem.className = 'listEvent'

    const usualElem = document.createElement('div')
    usualElem.classList.add('usual')

    this.toggle = document.createElement('input')
    this.toggle.type = 'checkbox'
    this.toggle.classList.add('listEventToggle')
    this.toggle.classList.add('onlyOwnPropretty')
    this.toggle.classList.add('usual')
    this.toggle.addEventListener('click', (e) => {
      this.changeStageToDoWithToggle(e, this.id)
    })

    this.textHolder = document.createElement('div')
    this.textHolder.classList.add('eventToDoInfo')
    this.textHolder.classList.add('usual')
    this.textHolder.classList.add('todoTextHolder')
    this.textHolder.addEventListener('click', (e) => {
      this.changeStageToDo(e, this.id, this.elem)
    })
    this.text = document.createElement('span')
    this.text.innerText = this.eventInfo

    const icoTrash = document.createElement('span')
    icoTrash.classList.add('glyphicon')
    icoTrash.classList.add('glyphicon-trash')
    icoTrash.classList.add('icoMargin')
    icoTrash.addEventListener('click', () => {
      this.removeTodo(this.id)
    })
    icoTrash.classList.add('onlyOwnPropretty')

    const icoPencil = document.createElement('span')
    icoPencil.classList.add('fa')
    icoPencil.classList.add('fa-pencil')
    icoPencil.classList.add('icoMargin')
    icoPencil.classList.add('onlyOwnPropretty')

    const icoHolder = document.createElement('div')
    icoHolder.classList.add('icoHolder')
    icoHolder.classList.add('usual')
    icoHolder.appendChild(icoPencil)
    icoHolder.appendChild(icoTrash)

    const editMenu = document.createElement('div')
    editMenu.classList.add('editing')

    const input = document.createElement('input')
    input.classList.add('editorInput')
    input.addEventListener('keyup', (e) => {
      e.preventDefault()
      if (e.keyCode === 13) {
        this.saveEditWithEnter(this.elem, this.id)
      }
    })

    const editIcoHolder = document.createElement('div')
    editIcoHolder.classList.add('editIcoHolder')
    const icoDisk = document.createElement('span')
    icoDisk.classList.add('glyphicon')
    icoDisk.classList.add('glyphicon-floppy-disk')
    icoDisk.addEventListener('click', (e) => {
      this.saveEdit(e, this.id)
    })
    const icoClose = document.createElement('span')
    icoClose.addEventListener('click', (e) => {
      this.stopEdit(e, this.id)
    })
    icoClose.classList.add('glyphicon')
    icoClose.classList.add('glyphicon-remove')

    this.textHolder.appendChild(this.text)
    editIcoHolder.appendChild(icoDisk)
    editIcoHolder.appendChild(icoClose)
    editMenu.appendChild(input)
    editMenu.appendChild(editIcoHolder)
    usualElem.appendChild(this.toggle)
    usualElem.appendChild(this.textHolder)
    usualElem.appendChild(icoHolder)
    this.elem.appendChild(usualElem)
    this.elem.appendChild(editMenu)

    this.usual = usualElem
    this.edit = editMenu
    icoPencil.addEventListener('click', (e) => {
      this.editTodo(e, this.id)
    })
    return this.elem
  }
}
