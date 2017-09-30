var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
function accessTokenRequire(req, res, next) {
  const access_token = req.body.access_token;
  try {
    const decoded_token = jwt.verify(access_token, secretAccess); //TODO узнать насчет реализации. Это работает, но надо по-другому
    next();
  }
  catch(e) {
    throw new Error('token expired');
  }

}

module.exports = accessTokenRequire;