class ApiError extends Error {
  constructor(message = 'Internal Server Error', statusCode = 500) {
    super(message);
    this.message = message;
    this.status = statusCode;
  }
}
module.exports = ApiError;
