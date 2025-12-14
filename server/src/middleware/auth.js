const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { AppError } = require('../utils/AppError');
const { User } = require('../modules/users/user.model');

async function auth(req, res, next) {
  try {
    const token = req.cookies && req.cookies.token;
    if (!token) {
      throw new AppError('Unauthorized', 401);
    }

    const payload = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) {
      throw new AppError('Unauthorized', 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(new AppError('Unauthorized', 401));
  }
}

module.exports = { auth };
