import React from 'react';
import renderer from 'react-test-renderer';
import Provider from './provider'
import { connect, createStore } from './index';

it('check render', () => {
  const component = renderer.create(
    <Provider><div></div></Provider>,
  );
  const provider = component.toJSON();
  expect(provider).toMatchSnapshot();
})

it('check func getting by connect', () => {
  const getProps = {}

  const store = createStore(() => { });

  const testFunc = () => { }

  const mapDispatchToProps = dispatch => ({
    testFunc: () => dispatch(testFunc()),
  })

  class Child extends React.Component {
    initial() {
      getProps.get = () => this.props
    }

    render() {
      this.initial()
      return <></>
    }
  }

  const Connect = connect(() => { }, mapDispatchToProps, Child)

  renderer.create(<Provider store={store}>
    <Connect />
  </Provider >)

  expect(typeof getProps.get().testFunc).toBe('function')
})

it('change state with connect', () => {
  const getProps = {}
  const reducer = (state = { bool: false }, action) => {
    switch (action.type) {
      case 'STATE_CHANGE': {
        return { bool: !state.bool }
      }
      default:
        return state
    }
  }

  const store = createStore(reducer);

  const testFunc = () => ({
    type: 'STATE_CHANGE',
  })

  const mapDispatchToProps = dispatch => ({
    testFunc: () => dispatch(testFunc()),
  })
  const mapStateToProps = state => ({
    state,
  })

  class Child extends React.Component {
    initial() {
      getProps.get = () => this.props
    }

    render() {
      this.initial()
      return <></>
    }
  }

  const Connect = connect(mapStateToProps, mapDispatchToProps, Child)

  renderer.create(<Provider store={store}>
    <Connect />
  </Provider >)

  expect(typeof getProps.get().testFunc).toBe('function')
  getProps.get().testFunc()
  expect(getProps.get().state.bool).toBe(true)
})

it('Init 2 components, change state from first component by action in second', () => {
  const getProps = {}
  const reducer = (state = { bool: false }, action) => {
    switch (action.type) {
      case 'STATE_CHANGE': {
        return { bool: !state.bool }
      }
      default:
        return state
    }
  }

  const store = createStore(reducer);

  const testFunc = () => ({
    type: 'STATE_CHANGE',
  })

  const mapDispatchToProps = dispatch => ({
    testFunc: () => dispatch(testFunc()),
  })
  const mapStateToProps = state => ({
    state,
  })

  class Child1 extends React.Component {
    initial() {
      getProps.get1 = () => this.props
    }

    render() {
      this.initial()
      return <></>
    }
  }
  class Child2 extends React.Component {
    initial() {
      getProps.get2 = () => this.props
    }

    render() {
      this.initial()
      return <></>
    }
  }

  const Connect1 = connect(mapStateToProps, () => { }, Child1)
  const Connect2 = connect(mapStateToProps, mapDispatchToProps, Child2)

  renderer.create(<Provider store={store}>
    <><Connect1 /><Connect2 /></>
  </Provider >)

  expect(typeof getProps.get2().testFunc).toBe('function')
  getProps.get2().testFunc()
  expect(getProps.get2().state.bool).toBe(true)
  expect(getProps.get1().state.bool).toBe(true)
})
