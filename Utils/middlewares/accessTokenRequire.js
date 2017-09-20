var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
function accessTokenRequire(req, res, next) {
  const access_token = req.body.access_token;
  const decoded_token = jwt.verify(access_token, secretAccess);
  next();

}

module.exports = accessTokenRequire;