import createStore from '../createStore'

it('created', () => {
  const store = createStore(() => 'all ok')
  expect(typeof store).toBe('object');
  expect(store.getState()).toBe('all ok');
})

it('reduser connect', () => {
  const reducer = (state = '', action) => {
    switch (action.type) {
      case 'ALL_OK': {
        return 'all ok'
      }
      default:
        return state
    }
  }
  const store = createStore(reducer);
  store.dispatch({ type: 'ALL_OK' })
  expect(store.getState()).toBe('all ok');
})

it('test subscribe', () => {
  const store = createStore(() => { });
  const component = 'component'
  store.subscribe(component)
  expect(store.getSubscribers()[0]).toBe('component');
})

it('test 2 subscribers', () => {
  const store = createStore(() => { });
  const component1 = 'component1'
  const component2 = 'component2'
  store.subscribe(component1)
  store.subscribe(component2)
  expect(store.getSubscribers()[0]).toBe('component1');
  expect(store.getSubscribers()[1]).toBe('component2');
})

it('test unsubscribers', () => {
  const store = createStore(() => { });
  const component1 = 'component1'
  const component2 = 'component2'
  const unsubscribe = store.subscribe(component1)
  store.subscribe(component2)
  expect(store.getSubscribers()[0]).toBe('component1');
  expect(store.getSubscribers()[1]).toBe('component2');
  unsubscribe()
  expect(store.getSubscribers()[0]).toBe('component2');
})
