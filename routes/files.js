var express = require('express');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var secretRefresh = 'wrgbnw459t3nruqfd)';
var uuidv4 = require('uuid/v4');
var passport = require('passport');

const multer = require('multer');


//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('this is file', file);
    // cb(null, '../public/images/')
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    file.originalname = uuidv4().toString() + '.png';
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });
//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

router.post('/', upload.single('image'), function(req, res, next) {
  console.log('heyheyhey')
  res.send(req.file.path);
});

module.exports = router;
