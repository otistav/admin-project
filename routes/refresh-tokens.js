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
var permissionMiddleware = require('../Utils/middlewares/permissionMiddleware');


/* GET users listing. */
router.get('/', function(req, res, next) {

});


router.post('/', accessTokenRequire, permissionMiddleware.getUserPermission, (req, res, next) => {
  res.send('acceeeeess');
});


router.patch('/', function(req, res, next) {
  var refresh_token = req.body.refresh_token;
  tokenService.refreshTokens(refresh_token).then(data => {
    res.send({access_token: jwt.sign({user_id: data.user_id}, project_config.secret_access_token_key, {expiresIn: 180}), refresh_token: data.refresh_token});
  }).catch(err => {
    next(err);
  })
});

module.exports = router;