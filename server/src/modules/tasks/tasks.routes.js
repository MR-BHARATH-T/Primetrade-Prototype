const express = require('express');

const { auth } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const {
  createTaskSchema,
  updateTaskSchema,
  listTasksQuerySchema,
  taskIdParamsSchema
} = require('./tasks.schema');
const {
  createTaskController,
  listTasksController,
  getTaskController,
  patchTaskController,
  deleteTaskController
} = require('./tasks.controller');

const tasksRouter = express.Router();

tasksRouter.use(auth);

tasksRouter.post('/', validate({ body: createTaskSchema }), createTaskController);
tasksRouter.get('/', validate({ query: listTasksQuerySchema }), listTasksController);
tasksRouter.get('/:id', validate({ params: taskIdParamsSchema }), getTaskController);
tasksRouter.patch('/:id', validate({ params: taskIdParamsSchema, body: updateTaskSchema }), patchTaskController);
tasksRouter.delete('/:id', validate({ params: taskIdParamsSchema }), deleteTaskController);

module.exports = { tasksRouter };
