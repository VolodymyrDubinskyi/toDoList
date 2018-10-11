import io from 'socket.io-client'

const socket = io.connect()
let room
const changeRoom = (newRoom) => {
  room = newRoom
  socket.emit('change room', room);
}

const changeTodo = (change) => {
  if (room) changeRoom(room)
  socket.emit('change todo', change);
}

const changeList = (change) => {
  if (room) changeRoom(room)
  socket.emit('change list', change);
}

const addList = (change) => {
  if (room) changeRoom(room)
  socket.emit('add list', change);
}

const addTodo = (change) => {
  if (room) changeRoom(room)
  socket.emit('add todo', change);
}

const removeList = (change) => {
  if (room) changeRoom(room)
  socket.emit('remove list', change);
}

const removeTodo = (change) => {
  if (room) changeRoom(room)
  socket.emit('remove todo', change);
}

const changeBoard = (change) => {
  if (room) changeRoom(room)
  socket.emit('change board', change);
}

const addBoard = (change) => {
  if (room) changeRoom(room)
  socket.emit('add board', change);
}

const removeBoard = (change) => {
  if (room) changeRoom(room)
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
  changeRoom,
}
