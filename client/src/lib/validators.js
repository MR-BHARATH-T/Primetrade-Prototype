import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name is required').max(80, 'Name too long'),
  email: z.string().email('Enter a valid email').max(200, 'Email too long'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(72)
});

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required')
});

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(160),
  description: z.string().max(2000).optional().default(''),
  status: z.enum(['open', 'done']).optional().default('open')
});
