var express = require('express');
var router = express.Router();
var db = require('../models');
var hashThePassword = require('../Utils/passwordHash');
var accessTokenRequire = require('../Utils/middlewares/accessTokenRequire');
const userValidator = require('../validators/userValidator');


/* GET users listing. */
router.get('/:id', (req, res, next) => {
  console.log(req.baseUrl);
});

router.post('/', function(req, res, next) {
  var hashPass = hashThePassword.cryptoThePassword(req.body.password);

  db.User.create({
    username: req.body.username,
    password: hashPass,
    role_id: req.body.role_id
  }).then(() => {
    res.status(200).send('user created!');
  }).catch(err => {
    next(err);
  })
});


router.patch('/:id', accessTokenRequire, userValidator, function(req, res, next) {
  let id = req.params.id;
  db.User.findById(id).then(user => {
    if (!user) throw new Error();
    user.username = req.body.username;
    user.password = hashThePassword.cryptoThePassword(req.body.password);
    return user.save();
  }).then((user) => {
    return db.RefreshToken.destroy({where: {user_id: user.uuid}})
  }).then((result) => {
    res.send(result)
  })
});

module.exports = router;
