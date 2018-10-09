import { combineReducers } from 'redux'

import user from './user'
import todos from './todos'
import lists from './lists'
import notifications from './notifications'
import boards from './boards'
import components from './components'

const combine = combineReducers({
  todos,
  user,
  lists,
  boards,
  notifications,
  components,
})

export default combine
