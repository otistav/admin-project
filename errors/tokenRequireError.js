var HTTPError = require('./HTTPError');
class TokenExistingError extends HTTPError{
  constructor(){
    super();
    this.errorName = 'Token Not Provied!';
    this.message = this.errorName;
    this.status = 401;
  }
}

module.exports = TokenExistingError;
