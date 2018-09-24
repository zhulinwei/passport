const mongo = require('../database').mongo.getDb('passport');

class User {
  constructor() {
    this.coll = mongo.collection("user");
  }
}

module.exports = new User();

