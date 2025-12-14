const express = require('express');

const { auth } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const { patchMeSchema } = require('./users.schema');
const { getMeController, patchMeController } = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/me', auth, getMeController);
usersRouter.patch('/me', auth, validate({ body: patchMeSchema }), patchMeController);

module.exports = { usersRouter };
