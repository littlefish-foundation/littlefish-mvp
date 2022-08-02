const ApiError = require('./api-error');

class NotFoundError extends ApiError {
  constructor() {
    super('Requested resource has not been found', 404);
  }
}
module.exports = NotFoundError;
