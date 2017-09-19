var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
function adminRequire(req, res, next) {
  const access_token = req.body.access_token;
  const decoded_token = jwt.verify(access_token, secretAccess);
  console.log('JWDNFIPWDFJWDPFJ',decoded_token);
  next();

}

module.exports = adminRequire;