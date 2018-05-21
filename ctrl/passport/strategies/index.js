const _ = require('lodash');
const QQStrategy = require('./qq');
const BaiduStrategy = require('./baidu');
const WeiboStrategy = require('./weibo');
const WechatStrategy = require('./wechat');
const PasswordStrategy = require('./passpord');

class Authenticator {
  constructor() {
    this.strategies = {};
  }
  
  use(name, strategy) {
    if (!name) throw Error('策略必须需要名字！');
    this.strategies[name] = strategy;
  }
}

// 新增策略
const authenticator = new Authenticator();
authenticator.use('qq', QQStrategy);
authenticator.use('baidu', BaiduStrategy);
authenticator.use('weibo', WeiboStrategy);
authenticator.use('wechat', WechatStrategy);
authenticator.use('password', PasswordStrategy);

module.exports = authenticator;
