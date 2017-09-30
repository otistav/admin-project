var project_config = require('../config/project_config');
var db = require('../models/index');
var uuidv4 = require('uuid/v4');
var jwt = require('jsonwebtoken');
exports.refreshTokens = (refresh_token) => {

  return db.RefreshToken.findOne({where: {refresh_token: refresh_token}}).then(data => {
    if (!data) throw new Error();
    if(!checkValidation(data.updatedAt)) throw new Error();

    data.refresh_token = uuidv4();
    return data.save();
  })

};


checkValidation = (refreshTokenDate) => {
  console.log(Date.now() - refreshTokenDate);
  return Date.now() - refreshTokenDate < project_config.half_a_year
};

