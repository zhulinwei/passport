const _ = require('lodash');
const configs = require('../../config');
const Enum = require('../../common/enum');
const authenticator = require('./strategies');

function getStrategyConfig(platform, client) {
  if (!platform) throw new Error('无效的登陆平台');
  if (![Enum.LoginStrategies.QQ, Enum.LoginStrategies.BAIDU, Enum.LoginStrategies.WEIBO, Enum.LoginStrategies.WECHAT].includes(platform))
    throw new Error('不合法的登陆平台');
  const platformConfig = _.find(configs.authorization, authenticator => authenticator.platform === platform);
  if (!platformConfig) throw new Error('无效的平台信息');
  const clientConfig = _.find(platformConfig.clients, client => client.type === client);
  if (!clientConfig) throw new Error('无效的客户端信息');
  return clientConfig;
}

class PassportController {
  async authenticate(ctx, next) {
    if (ctx.state.passport) return await next();
    const { platform, client } = ctx.params;
    const config = platform === Enum.LoginStrategies.Local ? {} : getStrategyConfig(platform, client);
    const strategy = new Strategy(config);
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
