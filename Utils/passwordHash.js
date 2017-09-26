var crypto = require('crypto');
var salt = require('../config/project_config.json');

exports.cryptoThePassword = (password) => {
  let key = "Keyefqwdfodsdv&&&^^^9n";
  return crypto.createHash('sha1').update(password+salt.salt).digest('hex');

};

