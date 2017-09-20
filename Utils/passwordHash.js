var crypto = require('crypto');
var salt = require('../config/salt.json');

exports.cryptoThePassword = (password) => {
  let key = "Keyefqwdfodsdv&&&^^^9n";
  return crypto.createHash('sha1').update(password+salt.salt).digest('hex');

};

