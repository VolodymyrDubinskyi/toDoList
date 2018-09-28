import { combineReducers } from 'redux'

import user from './user'
import lists from './lists'
import components from './components'

const combine = combineReducers({
  user,
  lists,
  components,
})

export default combine
