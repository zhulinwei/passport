const koa = require('koa');
const PORT = process.env.PORT;
const bodyParser = require('koa-bodyparser');

async function initialResource() {
  await require('./database').mongo.init();
}
  
async function start() {
  await initialResource();
  const app = new koa();
  app.use(bodyParser());
  const router = require('./router');
  router.routes(app);
  app.listen(PORT);
}

start().then(() => {
  console.log('passport running at ' + 'http://127.0.0.1:' + PORT);
}).catch(err => {
  console.log(err);
});
