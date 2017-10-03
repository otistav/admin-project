var express = require('express');
var router = express.Router();
var db = require('../models');
var hashThePassword = require('../Utils/passwordHash');
var accessTokenRequire = require('../Utils/middlewares/accessTokenRequire');
const userValidator = require('../validators/userValidator');
var userService = require('../services/userService');


router.get('/', (req, res, next) => {
  db.User.findAll().then(users => {
    res.send(users);
  }).catch(err => {
    next(err);
  })
});


router.get('/:id', (req, res, next) => {
  db.User.findById(req.params.id,{include: [{model: db.Role, include: [{all: true}]}]}).then(user => {
    res.send(user);
  })
});

router.post('/', function(req, res, next) {
  var hashPass = hashThePassword.cryptoThePassword(req.body.password);

  userService.createUser(req.body.username, hashPass, req.body.role_id).then((user) => {
    res.status(200).send(user);
  }).catch(err => {
    next(err);
  })
});


router.patch('/:id', accessTokenRequire, userValidator, function(req, res, next) {
  let id = req.params.id;
  userService.editUserFields(id).then((result) => {
    res.send(result)
  })
});

module.exports = router;
