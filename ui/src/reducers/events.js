// @flow

type actionParams = {
  type: string,
  payload: any,
}

const events = (state: any = [], action: actionParams) => {
  switch (action.type) {
    case 'ADD_EVENTS': {
      return action.payload.events
    }
    default:
      return state
  }
}

export default events
