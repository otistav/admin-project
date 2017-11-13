var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');
const reportsService = require('../services/reportsService');
let setting = require('../utils/settings');

router.get('/games/:id', function (req, res, next) {
  reportsService.getGameStatistic(req.params.id)
    .then(game_statistic => {
      console.log(game_statistic, 'this is game-statistic')
      res.send(game_statistic);
    })
    .catch(err => {
      next(err);
    })
})


router.get('/purchases/', function (req, res, next) {
  reportsService.getTopCustomers()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    })
})


module.exports = router;
