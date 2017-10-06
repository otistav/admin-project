const project_config = require('../config/project_config.json');

exports.calculateTotal = (scores) => {
  let totalScore = 0;
  scores.forEach(score => {
    if (Date.now() - score.updatedAt < project_config.one_month) {
      totalScore += score.value
    }
  });
  return totalScore;
};
