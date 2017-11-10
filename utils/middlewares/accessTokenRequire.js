var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
const project_config = require('../../config/project_config.json');
const tokenError = require('../../errors/tokenError');
const tokenExistingError = require('../../errors/tokenRequireError');
function accessTokenRequire(req, res, next) {
  console.log(req.headers, 'heeeeey');
  const access_token = req.headers.access_token;
  if (!access_token)
    throw new tokenExistingError();
  try {
    req.body.user_info = jwt.verify(access_token, project_config.secret_access_token_key);
    next();
  }
  catch(e) {
    console.log('this is error', e);
    throw new tokenError();
  }

}

module.exports = accessTokenRequire;
