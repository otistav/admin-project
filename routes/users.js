var express = require('express');
var router = express.Router();
var db = require('../models');
var hashThePassword = require('../Utils/passwordHash');
var accessTokenRequire = require('../Utils/middlewares/accessTokenRequire');

/* GET users listing. */
router.get('/', function(req, res, next) {

});

router.post('/', accessTokenRequire, function(req, res, next) {
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

module.exports = router;
