var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');
const gameService = require('../services/gameService');
let setting = require('../utils/settings');

router.get('/:id', function (req, res, next) {
  gameService.getGameStatistic(req.params.id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;