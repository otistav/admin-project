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
const statisticService = require('../services/statisticService');



router.get('/', function(req, res, next) {

});


// router.post('/', accessTokenRequire, permissionMiddleware.getUserPermission, (req, res, next) => {
//   res.send('access');
// });


router.patch('/', function(req, res, next) {
  var refresh_token = req.body.refresh_token;
  tokenService.refreshTokens(refresh_token)
    .then(data => {
      return statisticService.statisticCounter('token_refresh_count', data.user_id)
        .then(() => {
          return db.User.findById(data.user_id, {include: [{model: db.Role, include: [{all: true}]}]})
            .then(user => {
              res.send({
                access_token: jwt.sign({
                    user_id: data.user_id,
                    permissions: user.Role.permissions
                  },
                  project_config.secret_access_token_key,
                  {expiresIn: 180}),
                refresh_token: data.refresh_token,
                permissions: user.Role.permissions
              });
            })
        })


    })
    .catch(err => {
      next(err);
    })
});







function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

module.exports = router;