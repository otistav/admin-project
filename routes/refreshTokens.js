
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var db = require('../models');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log(token);
  console.log(jwt.verify(token, secret));
});

router.post('/', function (req, res, next) {
  if (req.body.refreshToken) {
    var token = req.body.refreshToken;
    var decode = jwt.verify(token, secretRefresh);
    console.log('this is decode: ', decode);
    Promise.resolve().then((user) => {
      var access_token = jwt.sign({ username: decode.username, password: decode.password }, secretAccess, { expiresIn: '1h' });
      var refresh_token = jwt.sign({ username: decode.username, password: decode.password }, secretRefresh, { expiresIn: '14 days' });
      console.log('access_token: ', access_token, 'refresh_token: ', refresh_token);

      return { access_token: access_token, refresh_token: refresh_token }

    }).then((tokens) => {
      res.send(tokens)
    })
  }
});

module.exports = router;
