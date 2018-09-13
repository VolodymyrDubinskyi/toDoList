const combineReducers = reducers => (state = {}, action) => {
  const reducerKeys = Object.keys(reducers)
  let hasChanged = false
  const nextState = {}

  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]
    const reducer = reducers[key]
    const previousStateForKey = state[key]
    const nextStateForKey = reducer(previousStateForKey, action)
    nextState[key] = nextStateForKey
    hasChanged = hasChanged || nextStateForKey !== previousStateForKey
  }

  return hasChanged ? nextState : state;
};

export default combineReducers
