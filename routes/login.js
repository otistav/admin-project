var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var hashThePassword = require('../utils/passwordHash');
var uuidv4 = require('uuid/v4');
const statisticService = require('../services/statisticService');
const ValidationError = require('../errors/validationErrors/userValidationError');

router.post('/', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  db.User.findOne({where: {username: username}, include: [{model: db.Role, include: [{all: true}]}]})
    .then(user => {
      if (user && user.password === hashThePassword.cryptoThePassword(password)) {
        return statisticService.statisticCounter('basic_auth_counter', user.uuid)
          .then(() => {
            return db.RefreshToken.create({
              user_id: user.uuid
            })
              .then(token => {
                res.send({
                  access_token: jwt.sign({user_id: user.uuid, permissions: user.Role.permissions}, secretAccess, {expiresIn: 30}),
                  refresh_token: token.refresh_token,
                  user: user
                });
              })
          })

      }
      else throw new ValidationError('wrong password or username')
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;
