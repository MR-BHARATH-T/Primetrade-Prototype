const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { env } = require('./config/env');
const { AppError } = require('./utils/AppError');
const { errorHandler } = require('./middleware/errorHandler');

const { authRouter } = require('./modules/auth/auth.routes');
const { usersRouter } = require('./modules/users/users.routes');
const { tasksRouter } = require('./modules/tasks/tasks.routes');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true
  })
);

app.get('/api/v1/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

app.use((req, res, next) => {
  next(new AppError('Not Found', 404));
});

app.use(errorHandler);

module.exports = { app };
