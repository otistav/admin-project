var express = require('express');
var router = express.Router();
var db = require('../models');
var hashThePassword = require('../utils/passwordHash');
var accessTokenRequire = require('../utils/middlewares/accessTokenRequire');
const userValidator = require('../validators/userValidator');
const userService = require('../services/userService');
const dealService = require('../services/dealService');

router.get('/', accessTokenRequire, (req, res, next) => {
  let limit = null;
  let offset = 0;
  let selectQuery = null;
  if (req.query.q) {
    let fullNameArray = req.query.q.split(' ');
    let likeQuery = [];
    fullNameArray.forEach(item => {
      likeQuery.push({like: '%' + item + '%'})
    });

    selectQuery = db.Sequelize.where(db.Sequelize.fn("concat", db.Sequelize.col("first_name"),  db.Sequelize.col("second_name")), ...likeQuery);
  }
  else {
    offset = req.query.offset;
    limit = req.query.limit;
  }
  Promise.all([db.User.findAll({where: selectQuery, include: [{all: true}],order: [['createdAt', 'ASC']], offset: offset, limit: limit}), db.User.count()])
    .then(([users, count]) => {
      res.send({count: count, users: users})
    })
    .catch(err => {
      next(err);
    })
});


router.get('/:id',accessTokenRequire, (req, res, next) => {

  db.User.findById(req.body.user_info.user_id)
    .then(user => {
      if (!user) throw new Error('user doesnt exist');
      res.send(user);
    })
});


router.get('/:id/deals', accessTokenRequire, (req, res, next) => {
  dealService.getUserDeals(req.params.id)
    .then(deals => {
      res.send(deals);
    })
});

router.post('/', userValidator, (req, res, next) =>  {
  const hashPass = hashThePassword.cryptoThePassword(req.body.password);
  console.log(req.body, 'this is body');
  userService.createUser(req.body.username, hashPass, req.body.role_id, req.body.first_name, req.body.second_name)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(err => {
      next(err);
    })
});


router.patch('/:id', accessTokenRequire,  (req, res, next) => {
  let id = req.params.id;
  console.log("HELLLO BROTHER")
  userService.editUserFields(id, req.body.password, req.body.username, req.body.first_name, req.body.second_name, req.body.role_id)
    .then((result) => {

      res.sendStatus(200)
    })
});


router.delete('/:id', accessTokenRequire, (req, res, next) => {
  db.User.findById(req.params.id)
    .then(user => {
      if (!user) throw new Error();
      return user.destroy();
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;
