const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const Router = require('koa-router');
const send = require('koa-send');
const koaStatic = require('koa-static');
const mongoose = require('mongoose')

const todos = require('./controlers/todos');
const users = require('./controlers/users');
const lists = require('./controlers/lists');
const secret = require('./controlers/secret')
const config = require('./config/index')

const url = `mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`;

const { port } = config.webServer
const router = new Router();
const app = new Koa();
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
  .get('*', async (ctx) => {
    await send(ctx, 'index.html', { root: `${__dirname}/ui/public` });
  })

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => console.log(`listen on port ${port}`))

// ------------------------------------------------------------------------------- //


// const newConfig = config.sequelize;

// const sequelize = new Sequelize(
//   newConfig.database,
//   newConfig.username,
//   newConfig.password,
//   newConfig,
// );

// const User = sequelize.define('user', {
//   firstName: {
//     type: Sequelize.STRING,
//   },
//   lastName: {
//     type: Sequelize.STRING,
//   },
// });

// User.sync({ force: false }).then(() => User.create({
//   firstName: 'new',
//   lastName: 'user',
// }));

// User.findAll().then((data) => {
//   data.map((eachUser) => {
//     console.log(eachUser.dataValues)
//     return null
//   })
// })
