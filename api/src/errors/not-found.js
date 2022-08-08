const ApiError = require('./api-error');

class NotFoundError extends ApiError {
  constructor(message = 'Requested resource has not been found') {
    super(message, 404);
  }
}
module.exports = NotFoundError;
