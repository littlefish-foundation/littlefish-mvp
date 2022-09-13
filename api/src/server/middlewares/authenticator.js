const jwt = require('jsonwebtoken');
const AuthenticationError = require('../../errors/authentication');
const config = require('../../config');

// Check if the user is authenticated
const authenticate = (req, res, next) => {
  const headerVal = req.headers.authorization || req.headers.Authorization;
  if (!headerVal) {
    return (next(new AuthenticationError('No token provided')));
  }
  const token = headerVal.split(' ')[1];

  const verified = jwt.verify(token, config.jwtSecret);
  if (!verified) {
    return (next(new AuthenticationError('Invalid token')));
  }
  return next();
};

module.exports = authenticate;
