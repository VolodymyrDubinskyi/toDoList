import combineReducers from '../../react-myRedux/combineReducers'

import user from './user'
import lists from './lists'
import components from './components'

const combine = combineReducers({
  user,
  lists,
  components,
})

export default combine
