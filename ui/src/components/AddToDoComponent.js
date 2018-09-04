export default class AddToDoComponent {
  constructor(handleAddTodoClick) {
    this.value = ''
    this.onAddTodoClick = handleAddTodoClick
  }

  render = () => {
    this.elem = document.createElement('div')
    this.elem.classList.add('clearfix')
    this.elem.classList.add('onlyOwnPropretty')
    this.holder = document.createElement('div')
    this.holder.classList.add('addToDoHolder')

    this.input = document.createElement('input')
    this.input.className = 'todoItemValue'
    this.input.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        if (!this.input.value) return
        this.onAddTodoClick();
        this.input.value = ''
      }
    });
    const button = document.createElement('button')
    button.class = 'addNewElemBtn'
    button.classList.add('btn')
    button.classList.add('btn-primary')
    button.innerText = 'Add Todo'
    button.addEventListener('click', (e) => {
      if (!this.input.value) return
      this.onAddTodoClick(e)
      this.input.value = ''
    })

    this.holder.appendChild(this.input)
    this.holder.appendChild(button)
    this.elem.appendChild(this.holder)

    return this.elem
  }
}
