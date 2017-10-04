var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');
var scoreService = require('../services/scoreService');


router.get('/', function (req, res, next) {

});


router.get('/:id', function (req, res, next) {
  scoreService.calculateBonusDiscount(req.params.id)
    .then(bonusDiscount => {
      console.log();
      res.send({bonusDiscount: bonusDiscount});
      // res.sendStatus(200);
    })
});


router.post('/', function (req, res, next) {
  scoreService.putScore(req.body.user_id, req.body.game_id, req.body.value)
    .then(data => {
      res.send(data);
    })
});

module.exports = router;