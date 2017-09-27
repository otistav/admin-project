const expressValidator = require('express-validator');


function handleValidationResult(req, res, next) {
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      var errors = result.array();
      res.status(400).send({
        message: 'Некорректный запрос', errors: errors.map(e => {
          return {param: e.param, message: e.msg}
        })
      });
    } else next();
  });
}


module.exports = handleValidationResult;



