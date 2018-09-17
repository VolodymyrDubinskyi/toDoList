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
      todo={{ title: 'old title', id: 512952 }}
      removeToDo={() => { }}
      listId={92573}
      editToDo={(listId, todoId, changes) => { status = { listId, todoId, changes } }}
    />,
  );
})

it('rendered', () => {
  expect(wrapper.exists()).toBe(true);
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
  wrapper.instance().saveAndStopEditing()

  expect(wrapper.state('editValue')).toBe('Some new title');
})
