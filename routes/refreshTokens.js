
var jwt = require('jsonwebtoken');
var secretAccess = 'asdfjqwergb12ff';
var db = require('../models');
var accessTokenRequire = require('../Utils/middlewares/accessTokenRequire');
var uuidv4 = require('uuid/v4');
var client = require('../redisClient');

var express = require('express');
var router = express.Router();

const HALF_A_YEAR = 60*60*24*180;


router.post('/', function (req, res, next) {

  var newToken = uuidv4();                            // Генерируем новый токен на выдачу
  var refresh_token = req.body.refresh_token;     

  client.getAsync(refresh_token).then((id) => {       // Получаем айдишник по токену
    if (id === null) throw new Error();               // Если айдишника нет, то выбрасываем ошибку
    return id
  }).then(id => {
    client.delAsync(refresh_token)                    // Удаляем запись со старым токеном
    return id
  }).then(id => {
    client.setAsync(newToken, id, "EX", HALF_A_YEAR)  // Кидаем новый токен в базу с нашим айдишником
    return id
  }).then(id => {
    db.User.findById(id).then((user) => {             // Ищем юзера в базе по айдишнику, чтобы "зашить" в новый access_token информацию о пользователе
      console.log(id, "<-----here is id")
      var access_token = jwt.sign({username: user.username, password: user.password}, secretAccess, {expiresIn: 180});
      
    })
  }).then(() => {
    res.send({access_token: access_token, refresh_token: newToken});
  }).catch(err => {
    next(err)
  })



  
});

module.exports = router;
