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
    default:
      return state
  }
}

export default user
