const _ = require('lodash');
const QQStrategy = require('./qq');
const BaiduStrategy = require('./baidu');
const LocalStrategy = require('./local');
const WeiboStrategy = require('./weibo');
const WechatStrategy = require('./wechat');

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
authenticator.use('local', LocalStrategy);
authenticator.use('wechat', WechatStrategy);

module.exports = authenticator;
