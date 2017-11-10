var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');
const gameService = require('../services/gameService');
let setting = require('../utils/settings');

router.get('/', function (req, res, next) {
  db.Game.findAll()
    .then(games => {
      res.send(games);
    })
})

router.get('/:id', function (req, res, next) {
  gameService.getGameStatistic(req.params.id)
    .then(data => {
      console.log(data, 'this is game statistic')
      res.send(data);
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;
