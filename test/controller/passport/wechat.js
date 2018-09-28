const sinon = require('sinon');
const assert = require('assert');
const Enum = require('../../../src/common').enum;
const mongoStub = require('../../lib').mongoStub;

describe('wechat login', () => {
  before(() => {
    mongoStub.init();
  });

  after(() => {
    mongoStub.clear();
  });

  it('wechat authorize', async () => {
    const WechatStrategy = require('../../../src/controller/passport/strategies/wechat');
    const wechatStrategy = new WechatStrategy({ appId: 'wechatAppId', appKey: 'wechatAppKey' });
    const wechatTokenStub = sinon.stub(wechatStrategy, '__getToken').callsFake(() => {
      return { openid: 'userOpenId', access_token: 'userAccessToken' };
    });
    const wechatUserInfoStub = sinon.stub(wechatStrategy, '__getUserInfo').callsFake(() => {
      return { openid: 'userOpenId' };
    });

    const options = {
      url: 'http://test.com?code=wechatCode',
      query: { code: 'wechatCode' }
    };
    const user = await wechatStrategy.authorize(options);
    assert.ok(user.provider, Enum.PlatformProvider.wechat);
    wechatTokenStub.restore();
    wechatUserInfoStub.restore();
  });
});
