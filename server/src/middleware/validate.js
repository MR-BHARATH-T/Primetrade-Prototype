const { ZodError } = require('zod');
const { AppError } = require('../utils/AppError');

function validate(schemas) {
  return function validateMiddleware(req, res, next) {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.query) req.query = schemas.query.parse(req.query);
      if (schemas.params) req.params = schemas.params.parse(req.params);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(new AppError(err.issues.map(i => i.message).join(', '), 400));
      }
      next(err);
    }
  };
}

module.exports = { validate };
