const db = require('../models/index');
const scoreUtil = require('../utils/scoreUtil');
const project_config = require('../config/project_config.json');



exports.getGameStatistic = (game_id) => {

  return db.User.findAll({
    include: [{ model: db.Score, as: 'scores', attributes: [] }],
    attributes: [ 'username',
      [db.sequelize.fn('SUM', db.sequelize.col('scores.value')), 'total_value']
    ],
    group: ['User.uuid'],
  })
};
