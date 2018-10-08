const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const Router = require('koa-router');
const send = require('koa-send');
const koaStatic = require('koa-static');
const mongoose = require('mongoose')

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

const todos = require('./controlers/todos');
const users = require('./controlers/users');
const lists = require('./controlers/lists');
const secret = require('./controlers/secret')
const config = require('./config/index')

const url = `mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`;

const router = new Router();

app.use(bodyParser());
app.use(cors());
mongoose.connect(url)

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
  .get('/todos/:id', todos.list)
  .post('/todos/', todos.create)
  .patch('/todos/:id/:list', todos.update)
  .delete('/todos/:id/:list', todos.remove)
  .get('/lists', lists.list)
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

app
  .use(router.routes())
  .use(router.allowedMethods());

io.on('connection', (socket) => {
  socket.on('change todo', (changes) => {
    socket.broadcast.emit('change todo', changes);
  });
  socket.on('change list', (changes) => {
    socket.broadcast.emit('change list', changes);
  });
  socket.on('remove list', (changes) => {
    socket.broadcast.emit('remove list', changes);
  });
  socket.on('remove todo', (changes) => {
    socket.broadcast.emit('remove todo', changes);
  });
  socket.on('add list', (changes) => {
    socket.broadcast.emit('add list', changes);
  });
  socket.on('add todo', (changes) => {
    socket.broadcast.emit('add todo', changes);
  });
});

server.listen(3000)
