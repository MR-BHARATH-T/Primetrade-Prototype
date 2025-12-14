const { z } = require('zod');

const createTaskSchema = z.object({
  title: z.string().min(1).max(160),
  description: z.string().max(2000).optional().default(''),
  status: z.enum(['open', 'done']).optional().default('open')
});

const updateTaskSchema = z.object({
  title: z.string().min(1).max(160).optional(),
  description: z.string().max(2000).optional(),
  status: z.enum(['open', 'done']).optional()
});

const listTasksQuerySchema = z.object({
  search: z.string().optional().default(''),
  status: z.enum(['open', 'done']).optional(),
  sort: z.enum(['newest', 'oldest']).optional().default('newest'),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20)
});

const taskIdParamsSchema = z.object({
  id: z.string().min(1)
});

module.exports = { createTaskSchema, updateTaskSchema, listTasksQuerySchema, taskIdParamsSchema };
