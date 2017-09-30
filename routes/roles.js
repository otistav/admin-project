var express = require('express');
var router = express.Router();
var db = require('../models');
const rolesService = require('../services/rolesService');


/* GET users listing. */
router.get('/', function(req, res, next) {
  db.Role.findAll({include: [{model: db.RolePermission, all: true}]}).then(role => {
    res.send(role);
  })

});

router.post('/', function(req, res, next) {
  rolesService.createRole(req.body.role_name, req.body.permissions).then(result => {
    res.send(result);
  })
});

router.patch('/:id', function (req, res, next) {
  console.log(req.params.id);
  rolesService.updateRole(
    req.body.role_name, req.body.new_permission,
    req.params.id
  ).then(result => {
    res.send(result);
  })
});

module.exports = router;