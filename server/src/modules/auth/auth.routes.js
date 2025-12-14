const express = require('express');

const { validate } = require('../../middleware/validate');
const { registerSchema, loginSchema } = require('./auth.schema');
const { registerController, loginController, logoutController } = require('./auth.controller');

const authRouter = express.Router();

authRouter.post('/register', validate({ body: registerSchema }), registerController);
authRouter.post('/login', validate({ body: loginSchema }), loginController);
authRouter.post('/logout', logoutController);

module.exports = { authRouter };
