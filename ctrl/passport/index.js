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












// const configs = require('../../config');
// const qqStrategy = require('./qqStrategy');

// class Passport {
//   constroctor() {
//     this.strategies = {
//       qq: require('./qqStrategy')
//     };
//   }
  
//   use(name, strategy) {
//     console.log(this);
//     if (!name) throw Error('策略必须需要名字！')
//     this.strategies[name] = strategy;
//   }

//   async authenticate(ctx, next) {
//     console.log('in');
//     const { type } = ctx.params;
//     console.log(this);
//     return falsel
//     const strategyType =  _.some(Object.keys(this.strategies), strategy => strtegy === type);
//     if (!strategyType) throw Error('无效的登陆类型！');
//     const Strategy = this.strategies[strategyType];
//     let config = {};
//     if (configs.authorization && configs.authorization[type] && configs.authorization[type][mode]) 
//       config = Object.assign(config, configs.authorization[type][mode]);
//     const strategy = new Strategy(model, config);
//     const options = {
//       query: ctx.query,
//       params: ctx.params,
//       body: ctx.request.body
//     };
//     ctx.state.passport = strategy.execute(options); 
//     await next();
//   }
// }

// const a = new Passport();
// a.use();

// module.exports = new Passport();



// module.exports = {
//   authenticate: func
// }
