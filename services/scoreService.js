const db = require('../models/index');
const project_config = require('../config/project_config');
const scoreUtil = require('../utils/scoreUtil');


exports.putScore = (user_id, game_id, value) => {
  return db.Score.create({
    user_id: user_id,
    game_id: game_id,
    value: value
  })
};


exports.calculateUserScore = (user_id) => {
  return db.Score.findAll({where: {user_id: user_id}})
    .then(scores => {
      const totalScore = scoreUtil.calculateTotal(scores);
      return {totalScore: totalScore}
    })
};


