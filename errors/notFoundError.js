var HTTPError = require('./HTTPError');
class ValidationError extends HTTPError{
  constructor(){
    super();
    this.errorName = 'Not Found Error!';
    this.message = this.errorName;
    this.status = 404;
  }
}

module.exports = ValidationError;