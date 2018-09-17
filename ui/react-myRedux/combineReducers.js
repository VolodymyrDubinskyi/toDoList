const combineReducers = reducers => (state = {}, action) => {
  const reducerKeys = Object.keys(reducers)
  const nextState = {}

  reducerKeys.forEach((key) => {
    const reducer = reducers[key]
    const previousStateForKey = state[key]
    const nextStateForKey = reducer(previousStateForKey, action)
    nextState[key] = nextStateForKey
  })

  return nextState;
};

export default combineReducers
