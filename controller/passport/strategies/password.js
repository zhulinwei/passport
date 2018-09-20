const utils = require('util');
const Base = require('./base');
const common = require('../../../common');
const request = require('request-promise-native');

const MODEL = Symbol('model');

class qqStrategy extends Base {
  constructor(config, model) {
    super();
    this[MODEL] = model;
  }

  __format(user) {
    if (!user) throw Error('无效的用户信息！');
    return {
      provider: 'password',
      mobile: user.mobile,
      password: user.password,
      avatar: 'default.png',
      body: user
    };
  }

  async authorize(options) {
    const { mobile, password } = options.body;
    if (!mobile) throw Error('无效的手机号码！');
    if (!password) throw Error('无效的密码！');

    return this.__format(Object.assign({ mobile, password }, user));
  }

  async authenticate(authorization) {
    const selector = { 
      mobile: authorization.mobile,
      password: common.helper.strongPassword(authorization.strongPassword)
    };
    let user = await this[MODEL].coll.findOne(selector);
    if (!user) throw Error('账号或密码错误！');
    
    return user;
  }
}

module.exports = qqStrategy;
