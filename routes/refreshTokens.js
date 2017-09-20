
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var db = require('../models');
var accessTokenRequire = require('../Utils/middlewares/accessTokenRequire');
var uuidv4 = require('uuid/v4');
var client = require('../redisClient');

var express = require('express');
var router = express.Router();

const HALF_A_YEAR = 60*60*24*180;


router.post('/', function (req, res, next) {

  var newToken = uuidv4();
  var refresh_token = req.body.refresh_token;

  client.getAsync(refresh_token).then((id) => {
    if (id === null) throw new Error();
    return id
  }).then(id => {
    client.delAsync(refresh_token).then((status) => {
      console.log('this thing i do first')
      if (status === 0) throw new Error();
    })
    return id
  }).then(id => {
    client.setAsync(newToken, id, "EX", HALF_A_YEAR)
    return id
  }).then(id => {
    db.User.findById(id).then((user) => {
      console.log(id, "<-----here is id")
      var access_token = jwt.sign({username: user.username, password: user.password}, secretAccess, {expiresIn: 180});
      res.send({access_token: access_token, refresh_token: newToken});
    })
  }).catch(err => {
    next(err)
  })



  
});

module.exports = router;
