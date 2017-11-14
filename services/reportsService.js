const db = require('../models/index');
const scoreUtil = require('../utils/scoreUtil');
const project_config = require('../config/project_config.json');



exports.getGameStatistic = (game_id) => {

  return db.sequelize.query('SELECT "User"."uuid", "User"."username",' +
  ' SUM("scores"."value") AS "total_value" FROM "Users"'
  + 'AS "User" LEFT OUTER JOIN "Scores" AS "scores" ON "User"."uuid" = "scores"."user_id" GROUP BY "User"."uuid" ORDER BY "total_value" DESC LIMIT 2;',
  { type: db.sequelize.QueryTypes.SELECT}
)
};


exports.getTopCustomersByNumberOfPurchases = () => {
  return db.sequelize.query(
    'SELECT "User"."uuid", "User"."username",' +
    'COUNT("deals") AS "count_deal" FROM "Users" AS "User" LEFT OUTER JOIN' +
    '"Deals" AS "deals" ON "User"."uuid" = "deals"."customer_id"' +
    'GROUP BY "User"."uuid" ORDER BY "count_deal" DESC LIMIT 5;',
    { type: db.sequelize.QueryTypes.SELECT})

}

exports.getTopCustomersBySpendedMoney = () => {
  return db.sequelize.query('SELECT' +
    '"User"."username",' +
    ' SUM("offers"."cost") AS "total_cost"' +
    ' FROM "Users" AS "User" LEFT OUTER JOIN ( "Deals" AS "offers->Deal" INNER JOIN "Offers" ' +
      'AS "offers" ON "offers"."uuid" = "offers->Deal"."offer_id") ' +
      ' ON "User"."uuid" = "offers->Deal"."customer_id"  GROUP BY "User"."username" ;',
  { type: db.sequelize.QueryTypes.SELECT})
}