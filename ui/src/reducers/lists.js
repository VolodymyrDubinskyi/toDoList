const lists = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LIST': {
      const newState = [
        ...state,
      ];
      newState.push(action.payload)
      return newState
    }
    case 'REMOVE_LIST': {
      const newState = state.filter(elem => elem.id !== action.payload);
      return newState
    }
    case 'EDIT_LIST': {
      let newState = [...state]
      newState = newState.map((elem) => {
        let newElem = elem
        if (newElem.id === action.payload.id) {
          newElem = Object.assign({}, newElem, action.payload.changes)
        }
        return newElem
      })
      return newState
    }
    case 'ADD_TODO': {
      const newState = state.filter(elem => elem.id !== action.payload.id);
      const list = state.filter(elem => elem.id === action.payload.id)[0];
      list.todos.push(action.payload.todo)
      newState.push(list)
      return newState
    }
    case 'REMOVE_TODO': {
      const newState = state.filter(elem => elem.id !== action.payload.listId);
      const list = state.filter(elem => elem.id === action.payload.listId)[0];
      list.todos = list.todos.filter(todo => todo.id !== action.payload.todoId)
      newState.push(list)
      return newState
    }
    case 'EDIT_TODO': {
      const newState = state.filter(elem => elem.id !== action.payload.listId);
      const list = state.filter(elem => elem.id === action.payload.listId)[0];
      const todos = list.todos.filter(todo => todo.id !== action.payload.todoId)
      let changingTodo = list.todos.filter(todo => todo.id === action.payload.todoId)[0]
      changingTodo = Object.assign({}, changingTodo, action.payload.changes)
      todos.push(changingTodo)
      todos.sort((a, b) => a.date > b.date)
      list.todos = todos
      newState.push(list)
      return newState
    }
    default:
      return state
  }
}

export default lists
