var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
const tokenError = require('../../errors/tokenError');
function accessTokenRequire(req, res, next) {
  console.log(req.headers, 'heeeeey');
  const access_token = req.headers.access_token;
  try {
    req.body.user_info = jwt.verify(access_token, secretAccess);
    next();
  }
  catch(e) {
    throw new tokenError();
  }

}

module.exports = accessTokenRequire;