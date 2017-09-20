var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var hashThePassword = require('../Utils/passwordHash');
var uuidv4 = require('uuid/v4');
var client = require('../redisClient')

/* GET users listing. */
router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {
  var token = req.body.refresh_token;
  client.del(token, (err, res) => {
    
  });
  res.send('successfuly logouted')
});

module.exports = router;