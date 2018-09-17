import React from 'react'
import * as enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import Registration from '../Registration'

enzyme.configure({ adapter: new ReactSixteenAdapter() });

let wrapper
beforeEach(() => {
  wrapper = enzyme.shallow(
    <Registration />,
  );
})

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

  const fakeEvent3 = {
    target: {
      value: 'confirmPassword',
    },
  }

  wrapper.instance().updateValue(fakeEvent1, 'passwordValue')
  wrapper.instance().updateValue(fakeEvent2, 'loginValue')
  wrapper.instance().updateValue(fakeEvent3, 'confirmPasswordValue')

  expect(wrapper.state('passwordValue')).toBe('password');
  expect(wrapper.state('confirmPasswordValue')).toBe('confirmPassword');
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
  wrapper.instance().updateValue(fakeEvent, 'confirmPasswordValue')
  expect(wrapper.instance().checkPasswords()).toBe(false);
  expect(wrapper.instance().checkLogin()).toBe(false);
  expect(wrapper.state('errorLogin')).toBe('Login must have more then 5 characters and not more then 14.');
  expect(wrapper.state('errorPassword')).toBe('Password must have more then 5 characters and not more then 14.');
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
  expect(wrapper.state('errorPassword')).toBe('Password must have more then 5 characters and not more then 14.');
})

it('check empty password or name', () => {
  expect(wrapper.instance().checkPasswords()).toBe(false);
  expect(wrapper.instance().checkLogin()).toBe(false);
  expect(wrapper.state('errorLogin')).toBe('Login must be filled out.');
  expect(wrapper.state('errorPassword')).toBe('Password must be filled out.');
})

it('check good password and name', () => {
  const fakeEvent = {
    target: {
      value: 'GoodPasOrLog',
    },
  }

  wrapper.instance().updateValue(fakeEvent, 'passwordValue')
  wrapper.instance().updateValue(fakeEvent, 'loginValue')
  wrapper.instance().updateValue(fakeEvent, 'confirmPasswordValue')
  expect(wrapper.instance().checkPasswords('GoodPass')).toBe(true);
  expect(wrapper.instance().checkLogin('GoodName')).toBe(true);
  expect(wrapper.state('errorLogin')).toBe('');
  expect(wrapper.state('errorPassword')).toBe('');
})

it('try registr', () => {
  let state = 'all ok'

  const fakeEvent = {
    target: {
      value: 'GoodPasOrLog',
    },
    preventDefault: () => {
      state = 'not ok'
    },
  }

  wrapper.instance().updateValue(fakeEvent, 'passwordValue')
  wrapper.instance().updateValue(fakeEvent, 'loginValue')
  wrapper.instance().updateValue(fakeEvent, 'confirmPasswordValue')
  wrapper.instance().registerUser(fakeEvent)
  expect(state).toBe('all ok');
})


it('write wrong password/name, and try registr', () => {
  let state = 'not ok'

  const fakeEvent = {
    target: {
      value: 'nope',
    },
    preventDefault: () => {
      state = 'all ok'
    },
  }

  wrapper.instance().updateValue(fakeEvent, 'passwordValue')
  wrapper.instance().updateValue(fakeEvent, 'loginValue')
  wrapper.instance().updateValue(fakeEvent, 'confirmPasswordValue')
  wrapper.instance().registerUser(fakeEvent)
  expect(state).toBe('all ok');
})
