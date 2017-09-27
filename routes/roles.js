var express = require('express');
var router = express.Router();
var db = require('../models');
const rolesUtil = require('../services/rolesService');


/* GET users listing. */
//TODO доделать ассоциации
router.get('/', function(req, res, next) {
  db.Role.findAll({where: {uuid: "59f0f6e6-657e-478f-8d50-7e177054f003"}, include: [{model: db.Permission, as: 'Permissions'}]}).then(role => {
    res.send(role);
  })

});

router.post('/', function(req, res, next) {
  rolesUtil.createRole(req.body.role_name, req.body.permissions).then(result => {
    res.send(result);
  })
});

router.patch('/:id', function (req, res, next) {
  console.log(req.params.id);
  rolesUtil.updateRole(
    req.body.role_name, req.body.new_permission,
    req.params.id
  ).then(result => {
    res.send(result);
  })
});

module.exports = router;