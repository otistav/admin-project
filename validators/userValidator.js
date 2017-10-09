const handleValidationResult = require('../utils/handleValidationResultUtil');

function editUserFields(req, res, next) {
  req.checkBody({
    username: {
      notEmpty: true,
      errorMessage: 'username is not allowed to be empty'
    },
    password: {
      notEmpty: true,
      errorMessage: 'password is not allowed to be empty'
    }
  });
  handleValidationResult(req, res, next);

}


module.exports = editUserFields;