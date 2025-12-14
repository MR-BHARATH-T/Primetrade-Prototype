const { asyncHandler } = require('../../utils/asyncHandler');
const { register, login, cookieOptions } = require('./auth.service');

const registerController = asyncHandler(async (req, res) => {
  const { user, token } = await register(req.body);

  res.cookie('token', token, cookieOptions());
  res.status(201).json({ user: user.toSafeJSON() });
});

const loginController = asyncHandler(async (req, res) => {
  const { user, token } = await login(req.body);

  res.cookie('token', token, cookieOptions());
  res.status(200).json({ user: user.toSafeJSON() });
});

const logoutController = asyncHandler(async (req, res) => {
  res.clearCookie('token', cookieOptions());
  res.status(200).json({ ok: true });
});

module.exports = { registerController, loginController, logoutController };
