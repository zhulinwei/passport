const config = require('../config').mongodb;
const MongoClient = require('mongodb').MongoClient;

class MongoDB {
  constructor() {
    this.dbs = {};
  }
  client () {
    return this.mongo;
  }
  async init() {
    const keys = Object.keys(config);
    await Promise.all(keys.map(async key => {
      let url = config[key].url || '';
      let options = config[key].options || {};
      let client = await MongoClient.connect(url, options);
      this.dbs[key] = client.db(key);
    }));
    return this.dbs;
  }
}

module.exports = new MongoDB();
