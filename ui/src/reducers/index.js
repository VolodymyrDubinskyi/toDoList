import { combineReducers } from 'redux'

import user from './user'
import todos from './todos'
import lists from './lists'
import components from './components'

const combine = combineReducers({
  todos,
  user,
  lists,
  components,
})

export default combine
