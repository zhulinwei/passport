const sinon = require('sinon');
const mongo = require('../../src/database').mongo;

class MongoStub{
  constructor() {
    this.mongoStub = {};
  }

  init() {
    this.mongoStub = sinon.stub(mongo, 'getDb').callsFake(function (){
      return { collection: () => {} };
    });
  }

  clear() {
    this.mongoStub.restore();
  }
}

module.exports = new MongoStub();

