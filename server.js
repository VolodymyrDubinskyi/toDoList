const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const Router = require('koa-router');
const send = require('koa-send');
const koaStatic = require('koa-static');

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

const todos = require('./controlers/todos');
const events = require('./controlers/events');
const boards = require('./controlers/boards');
const users = require('./controlers/users');
const lists = require('./controlers/lists');
const secret = require('./controlers/secret')


const router = new Router();

app.use(bodyParser());
app.use(cors());

app.use(async (ctx, next) => {
  let user = null
  if (ctx.request.header['x-access-token'] !== undefined) {
    try {
      user = await secret.checkToken(ctx.request.header['x-access-token'])
    } catch (err) {
      user = null;
    }
  }
  ctx.state.user = user
  await next();
})

app.use(koaStatic(`${__dirname}/ui/dist`));

router
  .get('*.img', async (ctx) => {
    await send(ctx, ctx.originalUrl, { root: `${__dirname}/ui/img` });
  })
  .get('*.png', async (ctx) => {
    await send(ctx, ctx.originalUrl, { root: `${__dirname}/ui/img` });
  })
  .get('*.jpg', async (ctx) => {
    await send(ctx, ctx.originalUrl, { root: `${__dirname}/ui/img` });
  })
  .post('/events/:id', events.list)
  .get('/todos/:id', todos.list)
  .post('/todos/', todos.create)
  .patch('/todos/:id/:list', todos.update)
  .delete('/todos/:id/:list', todos.remove)
  .get('/boards/:id', boards.list)
  .get('/board/:id', boards.getOne)
  .post('/boards/:id', boards.create)
  .patch('/boards/:id', boards.update)
  .delete('/boards/:id', boards.remove)
  .get('/lists/:id', lists.list)
  .post('/lists', lists.create)
  .delete('/lists', lists.remove)
  .patch('/lists', lists.update)
  .get('/users/login', users.tokenLogin)
  .get('/users/:id', users.checkUser)
  .post('/users/:id/login', users.login)
  .patch('/users/:id', users.update)
  .post('/users/', users.create)
  .get('/user/*', async (ctx) => {
    await send(ctx, 'index.html', { root: `${__dirname}/ui/public` });
  })
  .get('/authorization', async (ctx) => {
    await send(ctx, 'index.html', { root: `${__dirname}/ui/public` });
  })
  .get('/registration', async (ctx) => {
    await send(ctx, 'index.html', { root: `${__dirname}/ui/public` });
  })
  .get('*', async (ctx) => {
    await send(ctx, 'index.html', { root: `${__dirname}/ui/public` });
  })
app
  .use(router.routes())
  .use(router.allowedMethods());

io.on('connection', (socket) => {
  let currentRoom
  socket.on('change todo', (changes) => {
    socket.broadcast.in(currentRoom).emit('change todo', changes);
  });
  socket.on('change list', (changes) => {
    socket.broadcast.in(currentRoom).emit('change list', changes);
  });
  socket.on('remove list', (changes) => {
    socket.broadcast.in(currentRoom).emit('remove list', changes);
  });
  socket.on('remove todo', (changes) => {
    socket.broadcast.in(currentRoom).emit('remove todo', changes);
  });
  socket.on('add list', (changes) => {
    socket.broadcast.in(currentRoom).emit('add list', changes);
  });
  socket.on('add todo', (changes) => {
    socket.broadcast.in(currentRoom).emit('add todo', changes);
  });
  socket.in(`${socket.room}`).on('change board', (changes) => {
    socket.broadcast.in(currentRoom).emit('change board', changes);
  });
  socket.on('change room', (room) => {
    if (socket.room) socket.leave(currentRoom);
    currentRoom = room;
    socket.join(room);
  });
});

server.listen(3000)
