const sinon = require('sinon');
const assert = require('assert');
const Enum = require('../../../src/common').enum;
const mongoStub = require('../../lib').mongoStub;

describe('weibo login', () => {
  before(() => {
    mongoStub.init();
  });

  after(() => {
    mongoStub.clear();
  });

  it('weibo authorize', async () => {
    const WeiboStrategy = require('../../../src/controller/passport/strategies/weibo');
    const weiboStrategy = new WeiboStrategy({ appId: 'weiboAppId', appKey: 'weiboAppKey' });
    const weiboTokenStub = sinon.stub(weiboStrategy, '__getToken').callsFake(() => {
      return { uid: 'userUid', access_token: 'userAccessToken' };
    });
    const weiboUserInfoStub = sinon.stub(weiboStrategy, '__getUserInfo').callsFake(() => {
      return { id: 'userId' };
    });

    const options = {
      url: 'http://test.com?code=weiboCode',
      query: { code: 'weiboCode' }
    };
    const user = await weiboStrategy.authorize(options);
    assert.ok(user.provider, Enum.PlatformProvider.weibo);
    weiboTokenStub.restore();
    weiboUserInfoStub.restore();
  });
});
