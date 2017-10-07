var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var passport = require('passport');
const statisticService = require('../../services/statisticService');


router.get('/',passport.authenticate('vk', {
  successRedirect: 'http://localhost:3000/success',
  failureRedirect: '/'
}));


router.get('/callback', passport.authenticate('vk', {
    successRedirect: 'http://localhost:3000/success',
    failureRedirect: '/'
}));


router.get('/success', (req, res, next) => {
  statisticService.statisticCounter('social_network_auth_count')
    .then(() => {
      res.cookie('access',jwt.sign({}, 'adsfasd'));//TODO изменить на jwt корректный
      res.render(__dirname + 'index.html');
    })

});

module.exports = router;