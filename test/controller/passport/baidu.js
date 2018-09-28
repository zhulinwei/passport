const sinon = require('sinon');
const assert = require('assert');
const Enum = require('../../../src/common').enum;
const mongoStub = require('../../lib').mongoStub;

describe('baidu login', () => {
  before(() => {
    mongoStub.init();
  });

  after(() => {
    mongoStub.clear();
  });

  it('baidu authorize', async () => {
    const BaiduStrategy = require('../../../src/controller/passport/strategies/baidu');
    const baiduStrategy = new BaiduStrategy({ appId: 'baiduAppId', appKey: 'baiduAppKey' });
    const baiduTokenStub = sinon.stub(baiduStrategy, '__getToken').callsFake(() => {
      return { openid: 'userOpenId', access_token: 'userAccessToken' };
    });
    const baiduUserInfoStub = sinon.stub(baiduStrategy, '__getUserInfo').callsFake(() => {
      return { openid: 'userOpenId' };
    });
    const options = {
      url: 'http://test.com?code=baiduCode',
      query: { code: 'baiduCode' }
    };
    const user = await baiduStrategy.authorize(options);
    assert.ok(user.provider, Enum.PlatformProvider.BAIDU);
    baiduTokenStub.restore();
    baiduUserInfoStub.restore();
  });
});
