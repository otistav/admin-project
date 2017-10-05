var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var hashThePassword = require('../Utils/passwordHash');
var uuidv4 = require('uuid/v4');
//TODO вынести в сервис
router.post('/', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  db.User.findOne({where: {username: username}, include: [{model: db.Role, include: [{all: true}]}]})
    .then(user => {
      console.log(user.Role.permissions, "<---------------------THIS IS USER");
      if (user && user.password === hashThePassword.cryptoThePassword(password)) {
        return db.RefreshToken.create({
          user_id: user.uuid
        })
          .then(token => {
            res.send({
              access_token: jwt.sign({user_id: user.uuid, permissions: user.Role.permissions}, secretAccess, {expiresIn: 180}),
              refresh_token: token.refresh_token,
              permissions: user.Role.permissions
            });
          })

      }
      else throw new Error();
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;
