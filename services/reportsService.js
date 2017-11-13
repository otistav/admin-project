const db = require('../models/index');
const scoreUtil = require('../utils/scoreUtil');
const project_config = require('../config/project_config.json');



exports.getGameStatistic = (game_id) => {

  // return db.User.findAll({
  //   // limit: 2,
  //   include: [{ model: db.Score, as: 'scores', attributes: [] }],
  //   attributes: [
  //     'username',
  //     [db.sequelize.fn('SUM', db.sequelize.col('scores.value')), 'total_value']
  //   ],
  //   group: ['User.uuid'],
  //   // order: db.sequelize.fn('MAX', db.sequelize.col('scores.value'))
  // })
  return db.sequelize.query('SELECT "User"."uuid", "User"."username", SUM("scores"."value") AS "total_value" FROM "Users"'
  + 'AS "User" LEFT OUTER JOIN "Scores" AS "scores" ON "User"."uuid" = "scores"."user_id" GROUP BY "User"."uuid" LIMIT 2;',
  { type: db.sequelize.QueryTypes.SELECT}
)
};


exports.getTopCustomers = () => {

  return db.User.findAll({
    // include: [{model: db.Deal, as: 'deals', attributes: []}, {model: db.Offer, as: 'offers', attributes: []}],
    // attributes: [
    //   'username',
    //   // [db.sequelize.fn('SUM', db.sequelize.col('offers.cost')), 'number_of_deals']
    // ],
    // group: ['User.uuid']
  })
}
