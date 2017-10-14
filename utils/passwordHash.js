var crypto = require('crypto');
var project_config = require('../config/project_config.json');

exports.cryptoThePassword = (password) => {
  return crypto.createHash('sha1').update(password+project_config.salt).digest('hex');

};

