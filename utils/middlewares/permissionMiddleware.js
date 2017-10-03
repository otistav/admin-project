var jwt = require('jsonwebtoken');
var project_config = require('../../config/project_config.json');
exports.getUserPermission = (req, res, next) => {

  var flag = false;                                                                     // Объявляем флаг наличия права
  let permissions = project_config.permissions[req.baseUrl];                            // Права данного роута в конфиге
  for (let i = 0; i< req.body.user_info.permissions.length; i++) {                                 // Проходим по правам пользователя
    if (permissions.indexOf(req.body.user_info.permissions[i].uuid !== -1))                        // Если право есть в конфиге
      flag = true;                                                                      // то выставляем флаг на true и выходим из цикла
      break;
  }
  if (flag)                                                                             // если есть право, то пускаем дальше
    next();
  else
    throw new Error('you dont have permission');
};