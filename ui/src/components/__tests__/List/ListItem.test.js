import React from 'react'
import * as enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import ListItem from '../../List/ListItem'

enzyme.configure({ adapter: new ReactSixteenAdapter() });

let wrapper
let status
beforeEach(() => {
  status = ''
  wrapper = enzyme.shallow(
    <ListItem
      addCurrentList={() => { }}
      user={{}}
      list={{ id: 844562 }}
      deleteList={(id) => { status = `${id} - deleted` }}
    />,
  );
});

it('rendered', () => {
  expect(wrapper.exists()).toBe(true);
})

it('delete list', () => {
  wrapper.instance().deleteList()

  expect(status).toBe('844562 - deleted');
})
