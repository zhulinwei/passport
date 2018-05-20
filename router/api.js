const Router = require('koa-router');
const controller = require('../ctrl');

class Api {
  constructor() {
    const router = new Router();

    router.prefix('/api');

    router.post('/login/:type', controller.passport.authenticate, async (ctx, next) => {
      const user = ctx.state.passport;
      ctx.body = user;
    });

    router.get('/login/:type/:mode', controller.passport.authenticate, async (ctx, next) => {
      const user = ctx.state.passport;
      ctx.body = user;
    });
    
    return router;
  }
}

module.exports = new Api();
