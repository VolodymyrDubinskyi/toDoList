import io from 'socket.io-client'

const socket = io()

const changeTodo = (change) => {
  socket.emit('change todo', change);
}

const changeList = (change) => {
  socket.emit('change list', change);
}

const addList = (change) => {
  socket.emit('add list', change);
}

const addTodo = (change) => {
  socket.emit('add todo', change);
}

const removeList = (change) => {
  socket.emit('remove list', change);
}

const removeTodo = (change) => {
  socket.emit('remove todo', change);
}

export {
  changeTodo,
  changeList,
  addList,
  addTodo,
  removeList,
  removeTodo,
  socket,
}
