const ApiError = require('./api-error');

class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}
module.exports = BadRequestError;
