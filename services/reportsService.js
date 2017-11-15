const db = require('../models/index');
const scoreUtil = require('../utils/scoreUtil');
const project_config = require('../config/project_config.json');



exports.getGameStatistic = (game_id) => {
  // return db.User.findAll({
  //
  // })

  // WHERE "scores"."game_id" = :game_id

  return db.sequelize.query('SELECT * FROM (SELECT "User"."uuid", "User"."username",' +
    ' SUM("scores"."value") AS "total_value", "scores"."game_id" FROM "Users" '
    + 'AS "User" LEFT OUTER JOIN "Scores" AS "scores" ON "User"."uuid" = "scores"."user_id"' +
    'GROUP BY "User"."uuid", "scores"."game_id" ORDER BY "total_value" DESC) AS "game" GROUP BY "scores"."game_id";',
    { type: db.sequelize.QueryTypes.SELECT, replacements: {game_id: game_id}}
  )
};


exports.getTopCustomersByNumberOfPurchases = (min_date, max_date) => {
  return db.sequelize.query(
    'SELECT "User"."uuid", "User"."username",' +
    'COUNT("deals") AS "count_deal", "User"."createdAt"::date AS "date" FROM "Users" AS "User" LEFT OUTER JOIN' +
    '"Deals" AS "deals" ON "User"."uuid" = "deals"."customer_id"' +
    ' WHERE "deals"."createdAt"::date <= :max_date AND "deals"."createdAt"::date >= :min_date GROUP BY "User"."uuid" ORDER BY "count_deal" DESC LIMIT 5;',
    { type: db.sequelize.QueryTypes.SELECT, replacements: {min_date: min_date, max_date: max_date}})

}


exports.getTopCustomersBySpendedMoney = (min_date, max_date) => {
  return db.sequelize.query('SELECT' +
    '"User"."username",' +
    ' SUM("offers"."cost") AS "total_cost"' +
    ' FROM "Users" AS "User"  LEFT OUTER JOIN ( "Deals" AS "offers->Deal" INNER JOIN "Offers" ' +
      'AS "offers" ON "offers"."uuid" = "offers->Deal"."offer_id") ' +
      ' ON "User"."uuid" = "offers->Deal"."customer_id" WHERE "offers->Deal"."createdAt"::date <= :max_date AND' +
       '"offers->Deal"."createdAt"::date >= :min_date GROUP BY "User"."username" ORDER BY "total_cost" DESC LIMIT 5;',
  { type: db.sequelize.QueryTypes.SELECT, replacements: {min_date: min_date, max_date: max_date}})
}
