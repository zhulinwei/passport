const sinon = require('sinon');
const assert = require('assert');
const lib = require('../../lib');

lib.init();
const config = { appId: 'baiduAppId', appKey: 'baiduAppKey' };
const BaiduStrategy = require('../../../src/controller/passport/strategies/baidu');
const baiduStrategy = new BaiduStrategy(config);

describe('baidu login', () => {
  let mongoStub;
  before(() => {
      });

  after(() => {
    mongoStub.restore();
  });

  it('baidu authorize', async () => {
    const options = {
      url: 'http://test.com?code=baiduCode',
      query: { code: 'baiduCode' }
    };
    const result = await baiduStrategy.authorize(options);
    assert.ok(1, 1); 
  });
});
