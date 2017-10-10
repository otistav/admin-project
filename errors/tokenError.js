var HTTPError = require('./HTTPError');
class TokenError extends HTTPError{
  constructor(){
    super();
    this.errorName = 'Token Error!';
    this.message = this.errorName;
    this.status = 499;
  }
}

module.exports = TokenError;