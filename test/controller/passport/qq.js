const sinon = require('sinon');
const assert = require('assert');
const Enum = require('../../../src/common').enum;
const mongoStub = require('../../lib').mongoStub;

describe('qq login', () => {
  before(() => {
    mongoStub.init();
  });

  after(() => {
    mongoStub.clear();
  });

  it('qq authorize', async () => {
    const QQStrategy = require('../../../src/controller/passport/strategies/qq');
    const qqStrategy = new QQStrategy({ appId: 'qqAppId', appKey: 'qqAppKey' });
    const qqTokenStub = sinon.stub(qqStrategy, '__getToken').callsFake(() => {
      return 'access_token=qqAccessToken&expires_in=qqExpiresIn&refresh_token=qqRefreshToken';
    });
    const qqOpenIdStub = sinon.stub(qqStrategy, '__getOpenId').callsFake(() => {
      return 'callback( {"client_id":"qqClientId","openid":"userOpenId"} );';
    });
    const qqUserInfoStub = sinon.stub(qqStrategy, '__getUserInfo').callsFake(() => {
      return { openid: 'userOpenId', nickname: 'userNickname' };
    });

    const options = {
      url: 'http://test.com?code=qqCode',
      query: { code: 'qqCode' }
    };
    const user = await qqStrategy.authorize(options);
    assert.ok(user.provider, Enum.PlatformProvider.qq);
    qqTokenStub.restore();
    qqUserInfoStub.restore();
  });
});
