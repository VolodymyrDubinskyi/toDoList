// @flow

type actionParams = {
  type: string,
  payload: any,
}

const lists = (state: any = [], action: actionParams) => {
  switch (action.type) {
    case 'ADD_LIST': {
      const newState = state;
      const newList = action.payload;
      newState.push(newList)
      newState.sort((a, b) => a.index > b.index)
      return newState
    }
    case 'REMOVE_LIST': {
      const [...newState] = state.filter(elem => elem.id !== action.payload);
      newState.sort((a, b) => a.index > b.index)
      return newState
    }
    case 'EDIT_LIST_REDUCER': {
      let newState = state
      newState = newState.map((elem) => {
        let newElem = elem
        if (newElem.id === action.payload.id) {
          newElem = Object.assign({}, newElem, action.payload.changes)
        }
        return newElem
      })
      newState.sort((a, b) => a.index > b.index)
      return [...newState]
    }
    case 'ADD_TODO': {
      const [...newState] = state.filter(elem => elem.id !== action.payload.id);
      const list = state.filter(elem => elem.id === +action.payload.id)[0];
      if (!list.todos[0]) list.todos = []
      if (list.todos.indexOf(action.payload.todo.id) === -1) {
        list.todos.push(action.payload.todo.id)
        newState.push(list)
        return newState
      }
      return state
    }
    case 'REMOVE_TODO_REDUCER': {
      const [...newState] = state.filter(elem => elem.id !== action.payload.listId);
      const list = state.filter(elem => elem.id === action.payload.listId)[0];
      list.todos = list.todos.filter(todo => todo !== action.payload.todoId)
      newState.push(list)
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

export default lists
