// @flow

type actionParams = {
  type: string,
  payload: any,
}

const notifications = (state: any = [], action: actionParams) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const [...newState] = state;
      const newNotification = action.payload;
      newState.push(newNotification)
      return newState
    }
    case 'REMOVE_NOTIFICATION': {
      const [...newState] = state.filter(elem => elem.id !== action.payload);
      return newState
    }
    default:
      return state
  }
}

export default notifications
