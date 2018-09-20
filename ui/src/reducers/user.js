// @flow

type actionParams = {
  type: string,
  payload: any,
}

const user = (state :Object = {}, action :actionParams) => {
  switch (action.type) {
    case 'LOG_IN': {
      const newState = Object.assign({}, state, action.payload)
      return newState
    }
    case 'LOG_OUT': {
      const newState = {};
      return newState
    }
    case 'EDIT_USER': {
      const newState = Object.assign({}, state, action.payload)
      return newState
    }
    case 'ADD_LIST': {
      const newState = Object.assign({}, state)
      newState.lists.push(action.payload.id)
      return newState
    }
    case 'REMOVE_LIST': {
      const newState = Object.assign({}, state)
      newState.lists = newState.lists.filter(elem => elem !== action.payload);
      return newState
    }
    default:
      return state
  }
}

export default user
