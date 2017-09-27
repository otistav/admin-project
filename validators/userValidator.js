const handleValidationResult = require('../utils/handleValidationResultUtil');

function editUserFields(req, res, next) {
  req.checkBody('username').notEmpty();
  req.checkBody('password').notEmpty().isAlphanumeric();
  handleValidationResult(req, res, next);
}


module.exports = editUserFields;