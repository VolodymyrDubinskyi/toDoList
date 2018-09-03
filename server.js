const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const Router = require('koa-router');
const send = require('koa-send');
const serve = require('koa-static');
const todos = require('./controlers/todos');
const users = require('./controlers/users');
const lists = require('./controlers/lists');
const secret = require('./controlers/secret')

const router = new Router();
const app = new Koa();
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

app.use(serve(`${__dirname}/ui/dist`));


router
  .get('/', async (ctx) => {
    await send(ctx, ctx.path, { root: `${__dirname}/ui`, index: 'index.html' });
  })
  .get('/todos/:id', todos.list)
  .post('/todos/', todos.create)
  .patch('/todos/:id/:list', todos.update)
  .delete('/todos/:id/:list', todos.remove)
  .get('/lists', lists.list)
  .post('/lists', lists.create)
  .delete('/lists', lists.remove)
  .patch('/lists', lists.update)
  .post('/lists/:id', lists.getUserList)
  .get('/lists/:id/todos/:listId', todos.checkUserTodo)
  .get('/users/login', users.tokenLogin)
  .get('/users/:id', users.checkUser)
  .post('/users/:id/login', users.login)
  .post('/users/', users.create)
  .post('/:id', todos.checkUserTodo)
  .get('/:id', async (ctx) => {
    await send(ctx, 'index.html', { root: `${__dirname}/ui/` });
  })
  .get('*', (ctx) => {
    ctx.body = '<h1>Page not exist</h1>'
  })

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log('listen on port 3000'))
