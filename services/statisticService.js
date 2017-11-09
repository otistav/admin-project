const db = require('../models');


exports.statisticCounter = (target, user_id) => {
  let date = formatDate(new Date());
  return db.Statistic.findOrCreate({where: {date: date, user_id: user_id}, defaults: { token_refresh_count: 0, basic_auth_counter: 0, social_network_auth_count: 0 } })   //инкрементирует статистику target
    .then(([statistic, created]) => {
      statistic.increment(target)
    })
};


exports.sumStatisticByDate = () => {
  return db.Statistic.findAll({
    attributes: ['date',
      [db.sequelize.fn('SUM', db.sequelize.col('basic_auth_counter')), 'auth_count'],
      [db.sequelize.fn('SUM', db.sequelize.col('token_refresh_count')), 'token_count'],
      [db.sequelize.fn('SUM', db.sequelize.col('social_network_auth_count')), 'social_count'],
      [db.sequelize.fn('MAX', db.sequelize.col('createdAt')), 'createdAtn']
    ],
    group: ['date'],
    order: db.sequelize.fn('MAX', db.sequelize.col('createdAt'))
  })
};



function formatDate(date) {                   //TODO изменить на OnlyDate

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}
