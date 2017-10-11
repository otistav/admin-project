var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var hashThePassword = require('../Utils/passwordHash');
var uuidv4 = require('uuid/v4');
var passport = require('passport');
var statisticService = require('../services/statisticService');


router.get('/:id', function(req, res, next) {
  db.Statistic.findAll({
    where:
      {
        user_id: req.params.id
      }
  })
    .then(statistic => {
      res.send(statistic);
    })
    .catch(err => {
      next(err);
    })
});


router.get('/', function (req, res, next) {
  statisticService.sumStatisticByDate()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      next(err);
    })
});

router.post('/', function(req, res, next) {

});




module.exports = router;