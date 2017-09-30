var validationError = require('../validationError');


class userValidationError extends validationError {

  constructor(message){
    super();
    this.errorName = 'Validation Error!';
    this.message = message;
    this.status = 400;
  }
}


module.exports = userValidationError;