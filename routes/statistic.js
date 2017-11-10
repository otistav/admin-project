var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var uuidv4 = require('uuid/v4');
var passport = require('passport');
var statisticService = require('../services/statisticService');
const gameService = require('../services/gameService');

router.get('/users/:id', function(req, res, next) {
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
  console.log(req.query)
  let groupBy = req.query.groupBy;
  let groupByMethod;
  switch(groupBy) {
    case 'user': {
      groupByMethod = statisticService.groupStatisticByUser; //TODO write method to group by users
      break;
    }
    case 'date': {
      groupByMethod = statisticService.groupStatisticByDate;
      break;
    }
  }
  console.log(groupByMethod);
  groupByMethod()
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
