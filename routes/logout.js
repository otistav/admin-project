var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var hashThePassword = require('../Utils/passwordHash');
var uuidv4 = require('uuid/v4');
var passport = require('passport');


router.get('/',passport.authenticate('vkontakte'), function(req, res, next) {
  console.log(req.user);
  console.log('hello');
  res.render('hello')
});
//TODO make logout route
router.post('/', function(req, res, next) {
  console.log(req.user, 'this is user hello fuck you');
  res.send('hello')
});

module.exports = router;