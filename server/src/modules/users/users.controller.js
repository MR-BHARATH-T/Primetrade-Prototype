const { asyncHandler } = require('../../utils/asyncHandler');
const { updateMe } = require('./users.service');

const getMeController = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
});

const patchMeController = asyncHandler(async (req, res) => {
  const user = await updateMe({ userId: req.user._id, data: req.body });
  res.json({ user: user.toSafeJSON() });
});

module.exports = { getMeController, patchMeController };
