var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var hashThePassword = require('../Utils/passwordHash');
var uuidv4 = require('uuid/v4');
var passport = require('passport');


router.get('/:id', function(req, res, next) {
  if (req.query.statistic_target === 'user') {
    db.Statistic.findAll({
      where:
        {
          user_id: req.params.id
        }
    })
      .then(statistic => {
        res.send(statistic);
      })
  }
});

router.post('/', function(req, res, next) {

});




module.exports = router;