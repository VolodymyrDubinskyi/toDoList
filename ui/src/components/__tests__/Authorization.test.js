import React from 'react'
import * as enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { Authorization } from '../Authorization'

enzyme.configure({ adapter: new ReactSixteenAdapter() });

let wrapper
let state
beforeEach(() => {
  state = 'not authorized'
  wrapper = enzyme.shallow(
    <Authorization logIn={() => { state = 'all ok' }} />,
  );
});


it('rendered', () => {
  expect(wrapper.exists()).toBe(true);
})

it('enter password and login', () => {
  const fakeEvent1 = {
    target: {
      value: 'password',
    },
  }

  const fakeEvent2 = {
    target: {
      value: 'name',
    },
  }

  wrapper.instance().updateValue(fakeEvent1, 'passwordValue')
  wrapper.instance().updateValue(fakeEvent2, 'loginValue')

  expect(wrapper.state('passwordValue')).toBe('password');
  expect(wrapper.state('loginValue')).toBe('name');
})

it('check short password or name', () => {
  const fakeEvent = {
    target: {
      value: 'short',
    },
  }

  wrapper.instance().updateValue(fakeEvent, 'passwordValue')
  wrapper.instance().updateValue(fakeEvent, 'loginValue')
  expect(wrapper.instance().checkPasswords()).toBe(false);
  expect(wrapper.instance().checkLogin()).toBe(false);
  expect(wrapper.state('errorLogin')).toBe('Login must have more then 5 characters and not more then 14.');
})

it('check long password or nick', () => {
  const fakeEvent = {
    target: {
      value: 'ReallyLongPasswordOrName',
    },
  }

  wrapper.instance().updateValue(fakeEvent, 'passwordValue')
  wrapper.instance().updateValue(fakeEvent, 'loginValue')
  expect(wrapper.instance().checkPasswords()).toBe(false);
  expect(wrapper.instance().checkLogin()).toBe(false);
  expect(wrapper.state('errorLogin')).toBe('Login must have more then 5 characters and not more then 14.');
})

it('check empty password or name', () => {
  expect(wrapper.instance().checkPasswords()).toBe(false);
  expect(wrapper.instance().checkLogin()).toBe(false);
  expect(wrapper.state('errorLogin')).toBe('Login must be filled out.');
})

it('check good password and name', () => {
  const fakeEvent = {
    target: {
      value: 'GoodPasOrLog',
    },
  }

  wrapper.instance().updateValue(fakeEvent, 'passwordValue')
  wrapper.instance().updateValue(fakeEvent, 'loginValue')
  expect(wrapper.instance().checkPasswords()).toBe(true);
  expect(wrapper.instance().checkLogin()).toBe(true);
  expect(wrapper.state('errorLogin')).toBe('');
})

it('try authorize', () => {
  const fakeEvent = {
    target: {
      value: 'GoodPasOrLog',
    },
    preventDefault: () => { },
  }

  wrapper.instance().updateValue(fakeEvent, 'passwordValue')
  wrapper.instance().updateValue(fakeEvent, 'loginValue')
  wrapper.instance().tryAuthorize(fakeEvent)
  expect(state).toBe('all ok');
})

it('write wrong password/name, and try autorize', () => {
  const fakeEvent = {
    target: {
      value: 'nope',
    },
    preventDefault: () => { },
  }

  wrapper.instance().updateValue(fakeEvent, 'passwordValue')
  wrapper.instance().updateValue(fakeEvent, 'loginValue')
  wrapper.instance().tryAuthorize(fakeEvent)
  expect(state).toBe('not authorized');
})
