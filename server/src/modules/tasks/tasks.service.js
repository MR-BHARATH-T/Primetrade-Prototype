const mongoose = require('mongoose');
const { AppError } = require('../../utils/AppError');
const { Task } = require('./task.model');

async function createTask({ userId, data }) {
  const task = await Task.create({
    userId,
    title: data.title,
    description: data.description || '',
    status: data.status || 'open'
  });
  return task;
}

async function listTasks({ userId, query }) {
  const filter = { userId };

  if (query.status) {
    filter.status = query.status;
  }

  if (query.search) {
    const q = query.search.trim();
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
  }

  const sort = query.sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
  const skip = (query.page - 1) * query.limit;

  const [items, total] = await Promise.all([
    Task.find(filter).sort(sort).skip(skip).limit(query.limit),
    Task.countDocuments(filter)
  ]);

  return {
    items,
    page: query.page,
    limit: query.limit,
    total
  };
}

async function getTask({ userId, taskId }) {
  if (!mongoose.isValidObjectId(taskId)) throw new AppError('Not Found', 404);
  const task = await Task.findOne({ _id: taskId, userId });
  if (!task) throw new AppError('Not Found', 404);
  return task;
}

async function updateTask({ userId, taskId, data }) {
  if (!mongoose.isValidObjectId(taskId)) throw new AppError('Not Found', 404);
  const task = await Task.findOneAndUpdate({ _id: taskId, userId }, data, { new: true });
  if (!task) throw new AppError('Not Found', 404);
  return task;
}

async function deleteTask({ userId, taskId }) {
  if (!mongoose.isValidObjectId(taskId)) throw new AppError('Not Found', 404);
  const task = await Task.findOneAndDelete({ _id: taskId, userId });
  if (!task) throw new AppError('Not Found', 404);
  return task;
}

module.exports = { createTask, listTasks, getTask, updateTask, deleteTask };
