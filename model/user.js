const { mongo } = require('../db');

class User {
  constructor() {
    this.coll = mongo.dbs.passport.collection("user");
  }
}

module.exports = new User();
