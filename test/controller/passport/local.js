const sinon = require('sinon');
const assert = require('assert');
const Enum = require('../../../src/common').enum;
const mongoStub = require('../../lib').mongoStub;

describe('local login', () => {
  before(() => {
    mongoStub.init();
  });

  after(() => {
    mongoStub.clear();
  });

  it('local authorize', async () => {
    const LocalStrategy = require('../../../src/controller/passport/strategies/local');
    const localStrategy = new LocalStrategy();
    const options = {
      body: { mobile: 'mobile', password: 'password' }
    };
    const user = await localStrategy.authorize(options);
    assert.ok(user.provider, Enum.PlatformProvider.LOCAL);
  });
});
