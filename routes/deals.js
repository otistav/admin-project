var express = require('express');
var router = express.Router();
var dealService = require('../services/dealService');


router.get('/:id', (req, res, next) => {
  dealService.getDealById(req.params.id).then(deal => {
    res.send(deal);
  }).catch(err => {
    next(err);
  })
});


router.get('/', (req, res, next) => {
  dealService.getAllDeals().then(deals => {
    res.send(deals);
  })
});


module.exports = router;