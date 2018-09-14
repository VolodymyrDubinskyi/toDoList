import combineReducers from './combineReducers'

it('created', () => {
  const reducer = () => { }

  const combine = combineReducers(reducer)
  expect(typeof combine).toBe('function');
})

it('reducer give back value', () => {
  const reducer = (_, action) => {
    switch (action.type) {
      case 'ALL_OK': {
        return 'all ok'
      }
      default:
        return ''
    }
  }
  const combine = combineReducers({ reducer })
  const action = {
    type: 'ALL_OK',
  }
  const result = combine('', action)
  expect(result.reducer).toBe('all ok');
})

it('reducer give default value, if u set wrong action', () => {
  const reducer = (_, action) => {
    switch (action.type) {
      case 'NOT_DEFAULT': {
        return 'not default'
      }
      default:
        return 'default'
    }
  }
  const combine = combineReducers({ reducer })
  const action = {
    type: 'NOT_EXIST_TYPE',
  }
  const result = combine('', action)
  expect(result.reducer).toBe('default');
})

it('Two reducers', () => {
  const reducer1 = (_, action) => {
    switch (action.type) {
      case 'ALL_OK_FIRST_REDUCER': {
        return 'all ok'
      }
      default:
        return 'all not ok'
    }
  }
  const reducer2 = (_, action) => {
    switch (action.type) {
      case 'ALL_OK_SECOND_REDUCER': {
        return 'all not ok'
      }
      default:
        return 'all ok'
    }
  }

  const combine = combineReducers({ reducer1, reducer2 })
  const action = {
    type: 'ALL_OK_FIRST_REDUCER',
  }
  const result = combine('', action)
  expect(result.reducer1).toBe('all ok');
  expect(result.reducer2).toBe('all ok');
})

it('Two reducers with same action type', () => {
  const reducer1 = (_, action) => {
    switch (action.type) {
      case 'ALL_OK': {
        return 'all ok'
      }
      default:
        return 'all not ok'
    }
  }
  const reducer2 = (_, action) => {
    switch (action.type) {
      case 'ALL_OK': {
        return 'all ok'
      }
      default:
        return 'all not ok'
    }
  }

  const combine = combineReducers({ reducer1, reducer2 })
  const action = {
    type: 'ALL_OK',
  }
  const result = combine('', action)
  expect(result.reducer1).toBe('all ok');
  expect(result.reducer2).toBe('all ok');
})
