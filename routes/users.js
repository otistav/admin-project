var express = require('express');
var router = express.Router();
var db = require('../models');
var hashThePassword = require('../Utils/passwordHash');
var secretAccess = 'asdfjqwergb12ff';
var accessTokenRequire = require('../Utils/middlewares/accessTokenRequire');
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
var jwt = require('jsonwebtoken');


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send({access_token: jwt.sign({username: 'user.username', password: 'user.password'}, secretAccess, {expiresIn: 180})})
});

router.post('/', function(req, res, next) {
  var hashPass = hashThePassword.cryptoThePassword(req.body.password);
  db.User.create({
    username: req.body.username,
    password: hashPass,
  }).then(() => {
    res.status(200).send('user created!');
  }).catch(err => {
    next(err);
  })
});


router.patch('/:id', accessTokenRequire, function(req, res, next) {
  id = req.params.id;
  db.User.findById(id).then(user => {
    if (!user) throw new Error();
    user.password = hashThePassword.cryptoThePassword(req.body.password)
  }).then(() => {
    
  })
})

module.exports = router;
