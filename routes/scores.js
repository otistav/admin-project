var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');
var scoreService = require('../services/scoreService');


router.get('/', function (req, res, next) {

});


router.get('/:id', function (req, res, next) {
  scoreService.calculateUserScore(req.params.id)
    .then(bonusDiscount => {
      res.send(bonusDiscount);
    })
    .catch(err => {
      next(err);
    })
});


router.post('/', function (req, res, next) {
  scoreService.putScore(req.body.user_id, req.body.game_id, req.body.value)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;