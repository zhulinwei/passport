const Router = require('koa-router');
const controller = require('../controller');

class Api {
  constructor() {
    const router = new Router();

    router.prefix('/api');

    router.post('/login/:platform', controller.passport.authenticate, async (ctx, next) => {
      const user = ctx.state.passport;
      ctx.body = user;
    });

    router.get('/login/:platform/:client', controller.passport.authenticate, async (ctx, next) => {
      const user = ctx.state.passport;
      ctx.body = user;
    });
    
    return router;
  }
}

module.exports = new Api();
