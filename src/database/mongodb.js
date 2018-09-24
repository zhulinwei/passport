const config = require('../config').mongodb;
const MongoClient = require('mongodb').MongoClient;

class MongoDB {
  constructor() {
    this.dbs = {};
  }
  getDb(name) {
    if (!name) throw new Error('无效的数据库名称');
    return this.dbs[name];
  }
  async init() {
    const keys = Object.keys(config);
    await Promise.all(keys.map(async key => {
      let url = config[key].url || '';
      let options = config[key].options || {};
      let client = await MongoClient.connect(url, options);
      this.dbs[key] = client.db(key);
    }));
  }
}

module.exports = new MongoDB();
