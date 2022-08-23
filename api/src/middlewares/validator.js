const ValidationError = require('../errors/validation');

const validator = (schema) => (req, res, next) => {
  const inps = ['body', 'query', 'params'];

  for (let i = 0; i < inps.length; i += 1) {
    const inp = inps[i];
    if (schema[inp]) {
      const { error } = schema[inp].validate(req[inp]);

      if (error) {
        const errorMessage = error?.details?.map((detail) => detail?.message).join(', ');

        return next(new ValidationError(errorMessage));
      }
    }
  }
  return next();
};

module.exports = validator;
