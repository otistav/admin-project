const db = require('../models/index');
var project_config = require('../config/project_config');


exports.putScore = (user_id, game_id, value) => {
  return db.Score.create({
    user_id: user_id,
    game_id: game_id,
    value: value
  })
};


exports.calculateBonusDiscount = (user_id) => {
  return db.Score.findAll({where: {user_id: user_id}})
    .then(scores => {
      var totalScore = calculateTotal(scores);
      console.log("total score", totalScore);
      if (totalScore > 1000) {
        return 5 + totalScore/1000
      }
      else
        return 0
    })
};



calculateTotal = (scores) => {
  var totalScore = 0;
  scores.forEach(score => {
    console.log('THIS IS DIFFERENCE', Date.now() - score.updatedAt);
    if (Date.now() - score.updatedAt < project_config.one_month) {
      totalScore += score.value
    }
  });
  return totalScore;
};
