import { addNotification } from './notification';

import callGetEventsEndpoint from '../FetchCalls/event'


const addEventsAction = (data: Array): Object => ({
  type: 'ADD_EVENTS',
  payload: {
    events: data,
  },
})

const addEvents = (dispatch: Function) => (payload) => {
  callGetEventsEndpoint(payload)
    .then((data) => {
      dispatch(addEventsAction(data))
    })
    .catch(() => {
      addNotification(dispatch)({
        type: 'error',
        head: 'Something go wrong',
        info: '',
        id: Math.ceil(Math.random() * 9999999999),
      })
    })
}

export default addEvents
