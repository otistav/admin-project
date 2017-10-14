var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var uuidv4 = require('uuid/v4');
var passport = require('passport');


router.get('/',passport.authenticate('vkontakte'), function(req, res, next) {
  console.log(req.user);
  console.log('hello');
  res.render('hello');
});
router.post('/', function(req, res, next) {
  db.RefreshToken.findOne({where: {refresh_token: req.body.refresh_token}})
    .then(refresh_token => {
      return refresh_token.destroy();
    })
    .then(data => {
      res.send(data);
    });
});

module.exports = router;