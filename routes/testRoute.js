var express = require('express');
var router = express.Router();
var db = require('../models');
var hashThePassword = require('../Utils/passwordHash');
var accessTokenRequire = require('../Utils/middlewares/accessTokenRequire');

/* GET users listing. */
router.get('/', function(req, res, next) {

});

router.post('/', accessTokenRequire, function(req, res, next) {
	res.send('hello')
});

module.exports = router;
