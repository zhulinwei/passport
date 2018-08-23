const _ = require('lodash');
const configs = require('../../config');
const { User } = require('../../model');
const Authenticator = require('./strategies');

class PassportController {
  async authenticate(ctx, next) {
    const { type, mode } = ctx.params;
    const exists =  _.some(Object.keys(Authenticator.strategies), strategy => strategy === type);
    if (!exists) throw Error('无效的登陆类型！');
    const Strategy = Authenticator.strategies[type];
    let config = {};
    if (configs.authorization && configs.authorization[type] && configs.authorization[type][mode]) 
      config = Object.assign(config, configs.authorization[type][mode]);
    const strategy = new Strategy(config, User);
    const options = {
      url: ctx.href,
      query: ctx.query,
      params: ctx.params,
      body: ctx.request.body
    };
    ctx.state.passport = await strategy.execute(options); 
    await next();
  }
}

module.exports = new PassportController();
