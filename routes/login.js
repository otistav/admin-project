var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var hashThePassword = require('../Utils/passwordHash');
var uuidv4 = require('uuid/v4');
var client = require('../redisClient')

const HALF_A_YEAR = 60*60*24*180;

router.post('/', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  db.User.findOne({where: {username: username}}).then(user => {
    if (user && user.password === hashThePassword.cryptoThePassword(password)) {
      var access_token = jwt.sign({username: user.username, password: user.password}, secretAccess, {expiresIn: 30})
      var refresh_token = uuidv4();
      client.set(refresh_token, user.id, 'EX', HALF_A_YEAR);
      res.send({ refresh_token: refresh_token, access_token: access_token });
    }
  })
});

module.exports = router;
