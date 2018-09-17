import React from 'react'
import * as enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { AddToDoComponent } from '../../List/AddToDoComponent'

enzyme.configure({ adapter: new ReactSixteenAdapter() });

let wrapper
let todo
beforeEach(() => {
  todo = ''
  wrapper = enzyme.shallow(
    <AddToDoComponent
      addToDo={(id, todoTitle) => { todo = { id, todoTitle } }}
      user={{ currentList: 32324 }}
    />,
  );
});

it('rendered', () => {
  expect(wrapper.exists()).toBe(true);
})

it('try to edit input', () => {
  const fakeEvent = {
    target: {
      value: 'ToDo name',
    },
  }
  wrapper.instance().updateInputValue(fakeEvent)

  expect(wrapper.state('inputValue')).toBe('ToDo name');
})

it('try to add ToDo when nothing in input', () => {
  wrapper.instance().addTodo()

  expect(todo).toBe('');
})

it('try to add ToDo', () => {
  const fakeEvent = {
    target: {
      value: 'ToDo name',
    },
  }
  wrapper.instance().updateInputValue(fakeEvent)

  expect(wrapper.state('inputValue')).toBe('ToDo name');

  wrapper.instance().addTodo()

  expect(todo.id).toBe(32324);
  expect(todo.todoTitle).toBe('ToDo name');
})

it('try to add ToDo with enter', () => {
  const fakeEvent = {
    target: {
      value: 'ToDo name',
    },
    keyCode: 13,
  }
  wrapper.instance().updateInputValue(fakeEvent)

  expect(wrapper.state('inputValue')).toBe('ToDo name');

  wrapper.instance().addToDoUsingEnter(fakeEvent)

  expect(todo.id).toBe(32324);
  expect(todo.todoTitle).toBe('ToDo name');
})
