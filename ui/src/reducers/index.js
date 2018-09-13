import combineReducers from '../../react-myRedux/combineReducers'

import user from './user'
import lists from './lists'

const combine = combineReducers({
  user,
  lists,
})

const reducers = {
  user,
  lists,
}

export { combine, reducers }
