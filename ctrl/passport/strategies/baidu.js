const utils = require('util');
const Base = require('./base');
const common = require('../../../common');
const queryString = require('querystring');
const request = require('request-promise-native');

const MODEL = Symbol('model');
const APPID = Symbol('appId');
const APPKEY = Symbol('appKey');

class BaiduStrategy extends Base {
  constructor(config, model) {
    super();
    this[MODEL] = model;
    this[APPID] = config.appId;
    this[APPKEY] = config.appKey;
    this.request = request.defaults({
      forever: true,
      timeout: 10000,
      json: true,
      baseUrl: 'https://openapi.baidu.com'
    });
  }

  async __getToken(code, appId, appKey, redirect) {
    return await this.request({
      method: 'GET',
      url: '/oauth/2.0/token',
      qs: {
        code,
        client_id: appId,
        client_secret: appKey,
        redirect_uri: redirect,
        grant_type: 'authorization_code',
      }
    });
  }

  async __getUserInfo(openId, accessToken) {
    return await this.request({
      method: 'GET',
      url: '/rest/2.0/cambrian/sns/userinfo',
      qs: {
        openid: openId,
        access_token: accessToken,
      }   
    });
  }

  __format(user) {
    if (!user) throw Error('无效的用户信息！');
    return {
      provider: 'baidu',
      openId: user.openId,
      avatar: user.headimgurl,
      nickname: user.nickname,
      body: user
    };
  }

  async authorize(options) {
    const appId = this[APPID];
    const appKey = this[APPKEY];
    if (!(appId || appKey)) throw Error('无效的配置信息！');
    const code = options.query.code;
    const baiduToken = await this.__getToken(code, appId, appKey);
    if (!(baiduToken && baiduToken.access_token && baiduToken.openid)) throw Error('获取百度授权失败：无法获取百度用户令牌!');
    const openId = baiduToken.openid;
    const accessToken = baiduToken.access_token;
    const refreshToken = baiduToken.refresh_token;

    const user = await this.__getUserInfo(openId, accessToken);
    if (!user.openid) throw Error('获取百度授权失败，无法获取用户信息！'); 

    return this.__format(Object.assign({
      openId,
      accessToken,
      refreshToken
    }, user));
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

module.exports = BaiduStrategy;
