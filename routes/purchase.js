var express = require('express');
var router = express.Router();
var db = require('../models');
var offerService = require('../services/offerService');



router.get('/', function(req, res, next) {

});


router.post('/', function(req, res, next) {
  offerService.useOffer(req.body.user_id, req.body.offer_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });

});



module.exports = router;