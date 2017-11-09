var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var project_config = require('../config/project_config');
var secretRefresh = 'wrgbnw459t3nruqfd)';
var uuidv4 = require('uuid/v4');
var tokenService = require('../services/tokenService');
var accessTokenRequire = require('../utils/middlewares/accessTokenRequire');
var permissionMiddleware = require('../utils/middlewares/permissionMiddleware');
const statisticService = require('../services/statisticService');



router.get('/', function(req, res, next) {

});


// router.post('/', accessTokenRequire, permissionMiddleware.getUserPermission, (req, res, next) => {
//   res.send('access');
// });


router.patch('/', function(req, res, next) {
  console.log("THIS IS BODY", req.body);
  var refresh_token = req.body.refresh_token;
  tokenService.refreshTokens(refresh_token)
    .then(data => {
      return statisticService.statisticCounter('token_refresh_count', data.user_id)//Именно здесь расчитывается статистика TODO узнать, правильно ли это. Возможно, надо вынести в middleware, но есть нюансы
        .then(() => {
          return db.User.findById(data.user_id, {include: [{model: db.Role, include: [{all: true}]}]})
            .then(user => {
              console.log(user,'hey this is user');
              res.send({
                access_token: jwt.sign({
                    user_id: data.user_id,
                    permissions: user.Role.permissions
                  },
                  project_config.secret_access_token_key,
                  {expiresIn: 30}),
                refresh_token: data.refresh_token,
                permissions: user.Role.permissions
              });
            })
        })

        .catch(err => {
          next(err);
        })
    })
  });




module.exports = router;
