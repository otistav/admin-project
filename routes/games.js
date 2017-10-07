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


router.post('/', (req, res, next) => {
  setting.date = Date.now();
  res.send('hello')
});

router.get('/', (req, res, next) => {
  res.send({date: setting.date, value: setting.value} )
});

module.exports = router;