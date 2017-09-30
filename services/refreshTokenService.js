var db = require('../models/index');
var tokenService = require('../services/tokenService');
var uuidv4 = require('uuid/v4');

exports.refreshTokens = (refresh_token) => {

  return db.RefreshToken.findOne({where: {refresh_token: refresh_token}}).then(data => {
    if (!data) throw new Error();
    if(!tokenService.checkValidation(data.updatedAt)) throw new Error();

    data.refresh_token = uuidv4();
    return data.save();
  })

};
