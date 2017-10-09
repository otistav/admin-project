const expressValidator = require('express-validator');


function handleValidationResult(req, res, next) {
  console.log("HEYHEYHEY")
  req.getValidationResult()
    .then(function (result) {
      if (!result.isEmpty()) {
        var errors = result.array();
        console.log('this is errors', errors);
        res.status(400).send({
          message: 'Некорректный запрос', errors: errors.map(e => {
            return {param: e.param, message: e.msg}
          })
        });
      } else next();
    });
}


module.exports = handleValidationResult;



