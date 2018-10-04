import { combineReducers } from 'redux'

import user from './user'
import todos from './todos'
import lists from './lists'
import notifications from './notifications'
import components from './components'

const combine = combineReducers({
  todos,
  user,
  lists,
  notifications,
  components,
})

export default combine
