var express = require('express');
var router = express.Router();
var db = require('../models');
var dealService = require('../services/dealService');
//TODO доделать роут
router.get('/:id', (req, res, next) => {
  dealService.getDealById(req.params.id).then(deal => {
    res.send(deal);
  }).catch(err => {
    next(err);
  })
});


module.exports = router;