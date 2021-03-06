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
    .catch(err => {
      next(err);
    })
})

router.get('/:id', function (req, res, next) {
  db.Game.findById(req.params.id)
    .then(game => {
      res.send(game);
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;
