
const koa = require('koa');
const PORT = process.env.PORT;
const bodyParser = require('koa-bodyparser');

const { mongo } = require('./db');
mongo.init()
  .then(() => {
    const app = new koa();
    app.use(bodyParser());
    const router = require('./router');
    router.routes(app);
    app.listen(PORT);
  })
  .then(() => {
    console.log('passport running at ' + 'http://127.0.0.1:' + PORT);
  })

