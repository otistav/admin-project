var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');
const gameService = require('../services/gameService');
let setting = require('../utils/settings');

router.get('/games/:id', function (req, res, next) {
  gameService.getGameStatistic(req.params.id)
    .then(game_statistic => {
      res.send(game_statistic);
    })
    .catch(err => {
      next(err);
    })
})


module.exports = router;
