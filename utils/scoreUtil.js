const project_config = require('../config/project_config.json');

exports.calculateTotal = (scores, time_period) => {
  let period;
  switch(time_period) {
    case 'month': period = project_config.one_month;break;
    case 'week': period = project_config.one_week;break;
    case 'day': period = project_config.one_day;break;
    default: throw new Error();
  }
  let totalScore = 0;
  scores.forEach(score => {
    if (Date.now() - score.updatedAt < period) {
      totalScore += score.value
    }
  });
  return totalScore;
};


exports



