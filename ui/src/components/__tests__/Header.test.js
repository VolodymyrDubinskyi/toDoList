import React from 'react'
import * as enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { Header } from '../Header'

enzyme.configure({ adapter: new ReactSixteenAdapter() });

let wrapper
beforeEach(() => {
  wrapper = enzyme.shallow(
    <Header
      editList={() => { }}
      user={{ currentList: 1 }}
      logOut={() => { }}
      history={{ push: () => { } }}
      lists={[{ id: 1, title: 'Title' }]}
    />,
  );
});

it('rendered', () => {
  expect(wrapper.exists()).toBe(true);
})

it('statrt editing list name', () => {
  wrapper.instance().editTitle()

  expect(wrapper.state('titleEdit')).toBe(true);
  expect(wrapper.state('editValue')).toBe('Title');
})

it('try to edit title', () => {
  wrapper.instance().editTitle()
  const fakeEvent = {
    target: {
      value: 'Some new title',
    },
  }
  wrapper.instance().updateValue(fakeEvent)

  expect(wrapper.state('editValue')).toBe('Some new title');
})

it('stop editing', () => {
  wrapper.instance().editTitle()

  expect(wrapper.state('titleEdit')).toBe(true);
  expect(wrapper.state('editValue')).toBe('Title');

  wrapper.instance().stopEditing()

  expect(wrapper.state('titleEdit')).toBe(false);
  expect(wrapper.state('editValue')).toBe('');
})

it('stop editiong and save new title', () => {
  wrapper.instance().editTitle()

  const fakeEvent = {
    target: {
      value: 'Some new title',
    },
    keyCode: 13,
  }
  wrapper.instance().updateValue(fakeEvent)

  wrapper.instance().changeTitle(fakeEvent)

  expect(wrapper.state('titleEdit')).toBe(false);
})
