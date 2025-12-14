const { AppError } = require('../../utils/AppError');
const { User } = require('./user.model');

async function updateMe({ userId, data }) {
  const allowed = {};
  if (typeof data.name === 'string') allowed.name = data.name;

  const user = await User.findByIdAndUpdate(userId, allowed, { new: true });
  if (!user) throw new AppError('Not Found', 404);
  return user;
}

module.exports = { updateMe };
