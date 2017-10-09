var express = require('express');
var router = express.Router();
var db = require('../models');
var hashThePassword = require('../Utils/passwordHash');
var accessTokenRequire = require('../Utils/middlewares/accessTokenRequire');
const userValidator = require('../validators/userValidator');
const userService = require('../services/userService');
const dealService = require('../services/dealService');

router.get('/', (req, res, next) => {
  db.User.findAll().then(users => {
    res.send(users);
  }).catch(err => {
    next(err);
  })
});


router.get('/:id', (req, res, next) => {
  db.User.findById(req.params.id,{include: [{model: db.Role, include: [{all: true}]}]})
    .then(user => {
      res.send(user);
    })
});


router.get('/:id/deals', (req, res, next) => {
  dealService.getUserDeals(req.params.id).then(deals => {
    res.send(deals);
  })
});

router.post('/', userValidator, function(req, res, next) {
  const hashPass = hashThePassword.cryptoThePassword(req.body.password);

  userService.createUser(req.body.username, hashPass, req.body.role_id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(err => {
      next(err);
    })
});


router.patch('/:id',  userValidator, function(req, res, next) {
  let id = req.params.id;
  userService.editUserFields(id, req.body.password, req.body.username)
    .then((result) => {
      res.sendStatus(200)
    })
});


router.delete('/:id', function (req, res, next) {
  db.User.findById(req.params.id)
    .then(user => {
      if (!user) throw new Error();
      return user.destroy();
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;
