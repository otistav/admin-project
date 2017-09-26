var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var hashThePassword = require('../Utils/passwordHash');
var uuidv4 = require('uuid/v4');
const log4js = require('log4js');


log4js.configure({
  appenders: { debug: { type: 'file', filename: 'debug.log' } },
  categories: { default: { appenders: ['debug'], level: 'trace' } }
});
 
const loggerr = log4js.getLogger('debug');

const HALF_A_YEAR = 60*60*24*180;

router.post('/', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  db.User.findOne({where: {username: username}})
    .then(user => {
      if (user && user.password === hashThePassword.cryptoThePassword(password)) {
        
        return db.RefreshToken.create({
          user_id: user.uuid
        }).then(refresh_token => {
            res.send({access_token: jwt.sign({user_id: user.uuid}, secretAccess, {expiresIn: 180}), refresh_token: refresh_token.refresh_token});
          })

      }
      else throw new Error();
    })
    
    .catch(err => {
      next(err);
    })
});

module.exports = router;
