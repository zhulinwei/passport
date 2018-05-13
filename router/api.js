const Router = require('koa-router');
const controller = require('../ctrl');

class Api {
  constructor() {
    const router = new Router();
  
    router.prefix('/api');

    router.get('/login/:type/:mode', controller.passport.authenticate, async (ctx, next) => {
      await next();
      ctx.status = 200;
    });
    
    return router;
  }
}

module.exports = new Api();
