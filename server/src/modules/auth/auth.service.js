const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { env } = require('../../config/env');
const { AppError } = require('../../utils/AppError');
const { User } = require('../users/user.model');

function signToken(userId) {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    path: '/'
  };
}

async function register({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError('Email already in use', 409);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });
  const token = signToken(user._id.toString());

  return { user, token };
}

async function login({ email, password }) {
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = signToken(user._id.toString());
  return { user, token };
}

module.exports = { register, login, cookieOptions };
