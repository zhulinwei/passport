const utils = require('util');
const Base = require('./base');
const common = require('../../../common');
const queryString = require('querystring');
const request = require('request-promise-native');

const MODEL = Symbol('model');
const APPID = Symbol('appId');
const APPKEY = Symbol('appKey');

class WeiboStrategy extends Base {
  constructor(config, model) {
    super();
    this[MODEL] = model;
    this[APPID] = config.appId;
    this[APPKEY] = config.appKey;
    this.request = request.defaults({
      forever: true,
      timeout: 10000,
      json: true,
      baseUrl: 'https://api.weibo.com'
    });
  }

  async __getToken(code, appId, appKey, redirect) {
    return await this.request({
      method: 'POST',
      url: '/oauth2/access_token',
      qs: {
        code,
        client_id: appId,
        client_secret: appKey,
        redirect_uri: redirect,
        grant_type: 'authorization_code',
      }
    });
  }

  async __getUserInfo(uid, accessToken) {
    return await this.request({
      method: 'GET',
      url: '/2/users/show.json',
      qs: {
        uid,
        access_token: accessToken,
      }   
    });
  }

  __format(user) {
    if (!user) throw Error('无效的用户信息！');
    return {
      body: user,
      openId: user.openId,
      avatar: user.headimgurl,
      nickname: user.nickname,
      provider: common.enum.PlatformProvider.WEIBO,
    };
  }

  async authorize(options) {
    const appId = this[APPID];
    const appKey = this[APPKEY];
    if (!(appId || appKey)) throw Error('无效的配置信息！');
    const code = options.query.code;
    const redirect = options.url.substr(0, options.url.indexOf('code')-1);
    const weiboToken = await this.__getToken(code, appId, appKey, redirect);
    if (!(weiboToken && weiboToken.uid && weiboToken.access_token)) throw Error('获取微博授权失败：无法获取微博用户令牌!');

    const openId = weiboToken.uid;
    const accessToken = weiboToken.access_token;

    const user = await this.__getUserInfo(openId, accessToken);
    if (!user.id) throw Error('获取微博授权失败，无法获取用户信息！'); 

    return this.__format(Object.assign({ openId, accessToken }, user));
  }

  async authenticate(authorization) {
    const selector = { 
      openId: authorization.openId,
      provider: authorization.provider
    };
    let user = await this[MODEL].coll.findOne(selector);
    if (!user) {
      const _id = common.helper.newObjectId();
      const token = common.helper.newToken(_id, authorization.openId);
      user = Object.assign({
        _id,
        token,
      }, authorization);
      await this[MODEL].coll.insertOne(user);
    }
    return user;
  }
}

module.exports = WeiboStrategy;
