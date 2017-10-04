var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var hashThePassword = require('../Utils/passwordHash');
var uuidv4 = require('uuid/v4');
var passport = require('passport');
var offerService = require('../services/offerService');



router.get('/', function(req, res, next) {

});


router.post('/', function(req, res, next) {
  offerService.useOffer(req.body.user_id, req.body.offer_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });

});



module.exports = router;