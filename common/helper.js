const crypto = require('crypto');
const mongodb = require('mongodb');

class Helper {
  constructor() {}

  md5(content) {
    return crypto.createHash('md5').update(content).digest('hex');
  }

  sha256(content) {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  newObjectId(id) {
    return mongodb.ObjectID(id);
  }

  newToken(key, value) {
    return this.md5([key, this.md5(value)].join('&'));
  }

  strongPassword(key) {
    return this.sha256(md5(password));
  }
}

module.exports = new Helper();