var express = require('express');
var router = express.Router();
var db = require('../models');
var hashThePassword = require('../utils/passwordHash');
var accessTokenRequire = require('../utils/middlewares/accessTokenRequire');
const userValidator = require('../validators/userValidator');
const userService = require('../services/userService');
const dealService = require('../services/dealService');

router.get('/',accessTokenRequire, (req, res, next) => {
  db.User.findById(req.body.user_info.user_id)
    .then(user => {
      if (!user) throw new Error();
      res.send(user);

    })
});


module.exports = router;