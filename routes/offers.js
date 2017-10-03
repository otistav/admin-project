var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var hashThePassword = require('../Utils/passwordHash');
var uuidv4 = require('uuid/v4');
var passport = require('passport');
var offerService = require('../services/offerService');
const multer = require('multer')


//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });
//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''


router.post('/:id',upload.single('imageupload'), function (req, res, next) {
  db.Offer.findById(req.params.id).then(offer => {

  })
  res.send('uploaded successfully')
});


router.get('/:id', function(req, res, next) {
  offerService.findOne(req.params.id).then(offer => {
    res.send(offer);
  }).catch(err => {
    next(err);
  })
});


router.get('/', function (req, res, next) {
  offerService.findAll().then(offers => {
    res.send(offers);
  }).catch(err => {
    next(err);
  })
});


router.post('/', function(req, res, next) {
  offerService.create(req.body.options).then(offer => {
    res.send(offer);
  }).catch(err => {
    next(err);
  })
});


router.patch('/:id', function (req, res, next) {
  offerService.edit(req.params.id, req.body.options).then(result => {
    res.send(result);
  }).catch(err => {
    next(err);
  })
});


router.delete('/:id', function (req, res, next) {
  offerService.delete(req.params.id).then(() => {
    res.sendStatus(200);
  }).catch(err => {
    next(err);
  })
});



module.exports = router;