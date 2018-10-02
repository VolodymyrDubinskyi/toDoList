// @flow

type actionParams = {
  type: string,
  payload: any,
}

const lists = (state: any = [], action: actionParams) => {
  switch (action.type) {
    case 'ADD_LIST': {
      const newState = [
        ...state,
      ];
      newState.todos = []
      const newList = action.payload;
      newState.push(newList)
      newState.sort((a, b) => a.index > b.index)
      return newState
    }
    case 'REMOVE_LIST': {
      const newState = state.filter(elem => elem.id !== action.payload);
      newState.sort((a, b) => a.index > b.index)
      return newState
    }
    case 'EDIT_LIST_REDUCER': {
      console.log('++')
      let newState = [...state]
      if (action.payload.changes.todos) {
        return state
      }
      newState = newState.map((elem) => {
        let newElem = elem
        if (newElem.id === action.payload.id) {
          newElem = Object.assign({}, newElem, action.payload.changes)
        }
        return newElem
      })
      newState.sort((a, b) => a.index > b.index)
      return newState
    }
    case 'ADD_TODO': {
      const newState = state.filter(elem => elem.id !== action.payload.id);
      const list = state.filter(elem => elem.id === action.payload.id)[0];
      if (!list.todos[0].title) list.todos = []
      list.todos.push(action.payload.todo)
      newState.push(list)
      newState.sort((a, b) => a.index > b.index)
      return newState
    }
    case 'REMOVE_TODO': {
      const newState = state.filter(elem => elem.id !== action.payload.listId);
      const list = state.filter(elem => elem.id === action.payload.listId)[0];
      list.todos = list.todos.filter(todo => todo.id !== action.payload.todoId)
      newState.push(list)
      newState.sort((a, b) => a.index > b.index)
      return newState
    }
    case 'EDIT_TODO_REDUCER': {
      const newState = state.filter(elem => elem.id !== action.payload.listId);
      const list = state.filter(elem => elem.id === action.payload.listId)[0];
      const todos = list.todos.filter(todo => todo.id !== action.payload.todoId)
      let changingTodo = list.todos.filter(todo => todo.id === action.payload.todoId)[0]
      changingTodo = Object.assign({}, changingTodo, action.payload.changes)
      todos.push(changingTodo)
      todos.sort((a, b) => a.index > b.index)
      list.todos = todos
      newState.push(list)
      newState.sort((a, b) => a.index > b.index)
      return newState
    }
    default:
      return state
  }
}

export default lists
