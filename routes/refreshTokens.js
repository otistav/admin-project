
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var db = require('../models');
var accessTokenRequire = require('../Utils/middlewares/accessTokenRequire');
var uuidv4 = require('uuid/v4');
var client = require('../redisClient');

var express = require('express');
var router = express.Router();

const HALF_A_YEAR = 60*60*24*180;

/* GET users listing. */
router.get('/',  function(req, res, next) {
  res.send('HELLO JJJJKNKN!!!');
});

router.post('/', function (req, res, next) {
  // var token = req.body.refresh_token;
  // var access_token
  
  var newToken = uuidv4();
  // client.get(token, (err, result) => {
  //   var id = result
  // });
  // client.del(token)
  // console.log(id);
  // client.set(newToken, id, 'EX', HALF_A_YEAR);
  // req.send()
  var id;
  var refresh_token = req.body.refresh_token;
  // Promise.resolve().then(() => {
  //   client.get(refresh_token, (err, result) => {
  //     id = result;
  //     console.log("this is result", result)
  //   });
  // }).then(() => {
  //   client.del(refresh_token, (res) => {
  //     if (res === 0) throw new Error();
  //   })
  // }).then(() => {
  //   console.log(id);
  //   db.User.findById(id).then((user) => {
  //     var access_token = jwt.sign({username: user.username, password}, secretAccess, {expiresIn: 180});
  //     res.send({access_token: access_token, refresh_token: refresh_token});
  //   })
  client.get(refresh_token, (err, result) => {
      id = result;
      console.log("this is result", result)
      client.del(refresh_token, (result) => {
        if (result === 0) throw new Error();
        console.log(result, "<========this is result")
        client.set(newToken, id, () => {
          db.User.findById(id).then((user) => {
            console.log(newToken, "<=== here is new token")
            var access_token = jwt.sign({username: user.username, password: user.password}, secretAccess, {expiresIn: 180});
            res.send({access_token: access_token, refresh_token: newToken});
          })
        });
        
      })
      

      
    })

  
  
  var new_refresh_token = uuidv4();


  // db.User.findById(id).then(user => {
  //   if (!user) throw new Error();
  //   
  //   res.send(access_token, new_refresh_token);
  // }).catch((err) => {
  //   next(err);
  // })



  
});

module.exports = router;
