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

const changeBoard = (change) => {
  socket.emit('change board', change);
}

const addBoard = (change) => {
  socket.emit('add board', change);
}

const removeBoard = (change) => {
  socket.emit('remove board', change);
}

export {
  changeTodo,
  changeList,
  addList,
  addTodo,
  removeList,
  removeTodo,
  changeBoard,
  addBoard,
  removeBoard,
  socket,
}
