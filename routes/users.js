var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {
	db.User.create({
		username: req.body.username,
		password: req.body.password,
	}).then(() => {
		res.status(200).send('user created!');
	}).catch(err => {
		next(err);
	})
});

module.exports = router;
