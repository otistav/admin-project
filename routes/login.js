var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var hashThePassword = require('../Utils/passwordHash');

/* GET users listing. */
router.get('/', function(req, res, next) {

});

router.post('/', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  db.User.findOne({where: {username: username}}).then(user => {
    if (user && user.password === hashThePassword.cryptoThePassword(password)) {
      var access_token = jwt.sign({username: user.username, password: user.password}, secretAccess, {expiresIn: 1})
      var refresh_token = jwt.sign({username: user.username, password: user.password}, secretRefresh, {expiresIn: '14 days'})
      console.log('access_token: ', access_token, 'refresh_token: ', refresh_token);
      console.log('\n', 'decode token: ', jwt.verify(refresh_token, secretRefresh))
      res.send({ refresh_token: refresh_token, access_token: access_token });
    }
  })
});

module.exports = router;
