
const koa = require('koa');
const PORT = process.env.PORT;
const bodyParser = require('koa-bodyparser');

const { mongo } = require('./database');
console.log(mongo)
mongo.init()
  .then(() => {
    console.log(mongo)
    const app = new koa();
    app.use(bodyParser());
    const router = require('./router');
    router.routes(app);
    app.listen(PORT);
  })
  .then(() => {
    console.log('passport running at ' + 'http://127.0.0.1:' + PORT);
  })

