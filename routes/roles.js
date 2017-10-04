var express = require('express');
var router = express.Router();
var db = require('../models');
const roleService = require('../services/roleService');



router.get('/', function(req, res, next) {
  db.Role.findAll({include: [{all: true}]})
    .then(role => {
      res.send(role);
    })
    .catch(err => {
      next(err);
    })
});


router.get('/:id', function (req, res, next) {
  db.Role.findById(req.params.id)
    .then(role => {
      res.send(role);
    })
    .catch(err => {
      next(err);
    })
});


router.post('/', function(req, res, next) {
  roleService.createRole(req.body.role_name, req.body.permissions)
    .then(result => {
      res.send(result);
    })
});

router.patch('/:id', function (req, res, next) {
  console.log(req.params.id);
  roleService.updateRole(
    req.body.role_name, req.body.new_permission,
    req.params.id
  )
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      next(err);
    })
});

router.delete('/:id', function (req, res, next) {
  roleService.deleteRole(req.params.id)
    .then(() => {
      res.sendStatus(200);})
    .catch(err => {
      next(err);
    })
});

module.exports = router;