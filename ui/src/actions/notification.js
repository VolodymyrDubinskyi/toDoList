const removeNotificationAction = (payload): Object => ({
  type: 'REMOVE_NOTIFICATION',
  payload,
})

export const removeNotification = (dispatch: Function) => (payload) => {
  dispatch(removeNotificationAction(payload))
}

const addNotificationAction = data => ({
  type: 'ADD_NOTIFICATION',
  payload: {
    id: data.id, // eslint-disable-line
    type: data.type,
    head: data.head,
    info: data.info,
  },
})

export const addNotification = dispatch => (payload) => {
  dispatch(addNotificationAction(payload))
  return null
}
