var project_config = require('../config/project_config')


exports.checkValidation = (refreshTokenDate) => {
  console.log(Date.now() - refreshTokenDate)
  if (Date.now() - refreshTokenDate < project_config.half_a_year)
    return true
  else
    return false
}