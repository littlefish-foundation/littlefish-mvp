const ApiError = require('./api-error');

class ValidationError extends ApiError {
  constructor(message) {
    super(message, 400);
  }
}
module.exports = ValidationError;
