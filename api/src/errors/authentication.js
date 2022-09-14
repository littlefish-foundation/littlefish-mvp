const ApiError = require('./api-error');

class AuthenticationError extends ApiError {
  constructor(message = 'Not authorized') {
    super(message, 401);
  }
}
module.exports = AuthenticationError;
