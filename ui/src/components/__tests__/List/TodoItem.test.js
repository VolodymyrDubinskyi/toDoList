import React from 'react'
import * as enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { TodoItem } from '../../List/TodoItem'

enzyme.configure({ adapter: new ReactSixteenAdapter() });

let wrapper
let status
beforeEach(() => {
  status = ''
  wrapper = enzyme.shallow(
    <TodoItem
      todo={{ title: 'old title', id: 512952, chosen: false }}
      removeToDo={(listId, todoId) => { status = `ToDo ${todoId} in list ${listId} removed` }}
      listId={92573}
      editToDo={(listId, todoId, changes) => { status = { listId, todoId, changes } }}
    />,
  );
})

it('rendered', () => {
  expect(wrapper.exists()).toBe(true);
})

it('go to edit menu', () => {
  wrapper.instance().goToEdit()

  expect(wrapper.state('todoNowEditting')).toBe(true);
})

it('try to edit title', () => {
  const fakeEvent = {
    target: {
      value: 'Some new title',
    },
  }
  wrapper.instance().updateEditValue(fakeEvent)

  expect(wrapper.state('editValue')).toBe('Some new title');
})

it('Save and stop edditing', () => {
  const fakeEvent = {
    target: {
      value: 'Some new title',
    },
  }
  wrapper.instance().updateEditValue(fakeEvent)

  wrapper.instance().saveAndStopEditing()

  expect(wrapper.state('todoNowEditting')).toBe(false);
  expect(status.changes.title).toBe('Some new title');
  expect(status.todoId).toBe(512952);
  expect(status.listId).toBe(92573);
})

it('Save and stop edditing using enter', () => {
  const fakeEvent = {
    target: {
      value: 'Some new title',
    },
    keyCode: 13,
  }
  wrapper.instance().updateEditValue(fakeEvent)

  wrapper.instance().saveAndStopEdditingUsingEnter(fakeEvent)

  expect(wrapper.state('todoNowEditting')).toBe(false);
  expect(status.changes.title).toBe('Some new title');
  expect(status.todoId).toBe(512952);
  expect(status.listId).toBe(92573);
})

it('Stop edditing without save', () => {
  const fakeEvent = {
    target: {
      value: 'Some new title',
    },
  }
  wrapper.instance().updateEditValue(fakeEvent)

  wrapper.instance().stopEditing()

  expect(wrapper.state('todoNowEditting')).toBe(false);
  expect(status).toBe('');
})

it('Remove todo', () => {
  wrapper.instance().deleteTodo()

  expect(status).toBe('ToDo 512952 in list 92573 removed');
})

it('Toggle todo', () => {
  wrapper.instance().toggleChose()

  expect(wrapper.state('todoNowEditting')).toBe(false);
  expect(status.changes.chosen).toBe(true);
  expect(status.todoId).toBe(512952);
  expect(status.listId).toBe(92573);
})
