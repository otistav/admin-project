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
  console.log(req.query, 'this is ');
  let max_date = req.query.max_date;
  let min_date = req.query.min_date;

  if (req.query.type === "q") {
    reportsService.getTopCustomersByNumberOfPurchases(min_date, max_date)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        next(err);
      })
  }
  else if (req.query.type === "cash") {
    reportsService.getTopCustomersBySpendedMoney(min_date, max_date)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        next(err);
      })
  }
  else {
    throw new Error()
  }

})


module.exports = router;
