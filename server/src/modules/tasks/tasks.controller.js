const { asyncHandler } = require('../../utils/asyncHandler');
const { createTask, listTasks, getTask, updateTask, deleteTask } = require('./tasks.service');

const createTaskController = asyncHandler(async (req, res) => {
  const task = await createTask({ userId: req.user._id, data: req.body });
  res.status(201).json({ task });
});

const listTasksController = asyncHandler(async (req, res) => {
  const result = await listTasks({ userId: req.user._id, query: req.query });
  res.json(result);
});

const getTaskController = asyncHandler(async (req, res) => {
  const task = await getTask({ userId: req.user._id, taskId: req.params.id });
  res.json({ task });
});

const patchTaskController = asyncHandler(async (req, res) => {
  const task = await updateTask({ userId: req.user._id, taskId: req.params.id, data: req.body });
  res.json({ task });
});

const deleteTaskController = asyncHandler(async (req, res) => {
  await deleteTask({ userId: req.user._id, taskId: req.params.id });
  res.status(204).send();
});

module.exports = {
  createTaskController,
  listTasksController,
  getTaskController,
  patchTaskController,
  deleteTaskController
};
