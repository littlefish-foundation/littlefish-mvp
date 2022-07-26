const ValidationError = require('../../errors/validation');

// Validate request body,query and params according to the schemas provided.
const validator = (schemas) => (req, res, next) => {
  const inps = ['body', 'query', 'params'];

  for (const inp of inps) {
    if (schemas[inp]) {
      const { value, error } = schemas[inp].validate(req[inp]);

      if (error) {
        const errorMessage = error?.details?.map((detail) => detail?.message).join(', ');
        return next(new ValidationError(errorMessage));
      }
      req[inp] = value;
    }
  }
  return next();
};

module.exports = validator;
