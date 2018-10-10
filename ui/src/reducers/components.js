// @flow

type actionParams = {
  type: string,
  payload: any,
}

const components = (state :any = {}, action :actionParams) => {
  switch (action.type) {
    case 'ADD_TO_COMPONENT_STORAGE': {
      const newState = Object.assign({}, state, action.payload)
      return newState
    }
    default:
      return state
  }
}

export default components
