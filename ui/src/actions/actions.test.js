// import * as enzyme from 'enzyme';
// import ReactSixteenAdapter from 'enzyme-adapter-react-16';
// import {
//   logIn, logOut, editUser, addList, removeList,
//   editList, addToDo, removeToDo, editToDo,
// } from './actions'

// enzyme.configure({ adapter: new ReactSixteenAdapter() });

// it('logIn test', () => {
//   const holder = logIn('some name')
//   expect(holder.type).toBe('LOG_IN');
//   expect(holder.payload.name).toBe('some name');
//   expect(holder.payload.visibility).toBe(true);
//   expect(holder.payload.lists.length).toBe(0);
// })

// it('logOut test', () => {
//   const holder = logOut('some name')
//   expect(holder.type).toBe('LOG_OUT');
//   expect(holder.payload).toBe(undefined);
// })

// it('editUser test', () => {
//   const holder = editUser({ someChange: 'change' })
//   expect(holder.type).toBe('EDIT_USER');
//   expect(holder.payload.someChange).toBe('change');
// })

// it('addList test', () => {
//   const holder = addList({ someChange: 'change' })
//   expect(holder.type).toBe('ADD_LIST');
//   expect(holder.payload.title).toBe('no name');
//   expect(holder.payload.visibility).toBe(true);
//   expect(holder.payload.todos.length).toBe(0);
// })

// it('removeList test', () => {
//   const holder = removeList(137)
//   expect(holder.type).toBe('REMOVE_LIST');
//   expect(holder.payload).toBe(137);
// })

// it('removeList test', () => {
//   const holder = editList(72456, { some: 'changes' })
//   expect(holder.type).toBe('EDIT_LIST');
//   expect(holder.payload.id).toBe(72456);
//   expect(holder.payload.changes.some).toBe('changes');
// })

// it('addToDo test', () => {
//   const holder = addToDo(5234523, 'ToDo title')
//   expect(holder.type).toBe('ADD_TODO');
//   expect(holder.payload.id).toBe(5234523);
//   expect(typeof holder.payload.todo.id).toBe('number');
//   expect(typeof holder.payload.todo.date).toBe('number');
//   expect(holder.payload.todo.title).toBe('ToDo title');
//   expect(holder.payload.todo.chosen).toBe(false);
// })

// it('removeToDo test', () => {
//   const holder = removeToDo(5234523, 835121)
//   expect(holder.type).toBe('REMOVE_TODO');
//   expect(holder.payload.listId).toBe(5234523);
//   expect(holder.payload.todoId).toBe(835121);
// })

// it('editToDo test', () => {
//   const holder = editToDo(5234523, 835121, { some: 'changes' })
//   expect(holder.type).toBe('EDIT_TODO');
//   expect(holder.payload.listId).toBe(5234523);
//   expect(holder.payload.todoId).toBe(835121);
//   expect(holder.payload.changes.some).toBe('changes');
// })
