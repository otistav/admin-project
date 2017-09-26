var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var project_config = require('../config/project_config');
var secretRefresh = 'wrgbnw459t3nruqfd)';
var hashThePassword = require('../Utils/passwordHash');
var uuidv4 = require('uuid/v4');
var tokenService = require('../services/tokenService');
var accessTokenRequire = require('../Utils/middlewares/accessTokenRequire');

/* GET users listing. */
router.get('/', function(req, res, next) {

});

router.post('/',accessTokenRequire, (req, res, next) => {
  res.send('acceeeees')
})


// Это все я перенесу в сервис позже.
router.patch('/', function(req, res, next) {
  var refresh_token = req.body.refresh_token;
  db.RefreshToken.findOne({where: {refresh_token: refresh_token}}).then(data => {
    if (!data) throw new Error();
    if(!tokenService.checkValidation(data.updatedAt)) throw new Error();

    data.refresh_token = uuidv4();
    return data.save();
  }).then(data => {
    res.send({access_token: jwt.sign({user_id: data.user_id}, project_config.secret_access_token_key, {expiresIn: 180}), refresh_token: data.refresh_token});
  }).catch(err => {
    next(err);
  })
});

module.exports = router;