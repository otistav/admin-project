var jwt = require('jsonwebtoken');
var project_config = require('../../config/project_config.json');
exports.getUserPermission = (req, res, next) => {
  var decoded = jwt.verify(req.body.access_token, project_config.secret_access_token_key);
  console.log(req.baseUrl);
  var counter = 0;
  for (let i = 0; i< decoded.permissions.length; i++) {
    if (project_config.permissions[req.baseUrl].indexOf(decoded.permissions[i].uuid !== -1))
      console.log("YEEEES");
      counter++;
      break;
  }
  if (counter > 0)
    next();
  else
    throw new Error('you dont have permission');
};