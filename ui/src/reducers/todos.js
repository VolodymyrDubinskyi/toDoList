// @flow

type actionParams = {
  type: string,
  payload: any,
}

const todos = (state: any = [], action: actionParams) => {
  switch (action.type) {
    case 'ADD_TODO': {
      const [...newState] = state
      newState.push(action.payload.todo)
      newState.sort((a, b) => a.index > b.index)
      return newState
    }
    case 'EDIT_TODO_REDUCER': {
      let newState = state;
      const newTodos = newState.filter(todo => todo.id !== action.payload.todoId)
      let changingTodo = newState.filter(todo => todo.id === action.payload.todoId)[0]
      changingTodo = Object.assign({}, changingTodo, action.payload.changes)
      newTodos.push(changingTodo)
      newTodos.sort((a, b) => a.index > b.index)
      newState = newTodos
      return newState
    }
    case 'CLEAR_STORE': {
      const newState = []
      return newState
    }
    default:
      return state
  }
}

export default todos
