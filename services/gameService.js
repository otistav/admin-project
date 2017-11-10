const db = require('../models/index');
const scoreUtil = require('../utils/scoreUtil');
const project_config = require('../config/project_config.json');



exports.getGameStatistic = (game_id) => {
  return db.Score.findAll({                                                                     //получение статистики по юзерам и играм
    attributes: ['user_id', [db.sequelize.fn('SUM', db.sequelize.col('value')), 'total_score']],
    where: {
      // createdAt: {
      //   $gt: Date.now() - project_config.one_month
      // },
      game_id: game_id
    },
    group: ['user_id']
  })

};
