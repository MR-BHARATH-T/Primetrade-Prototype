const { env } = require('../config/env');

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  const payload = {
    message: err.message || 'Internal Server Error'
  };

  if (env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }

  res.status(statusCode).json(payload);
}

module.exports = { errorHandler };
