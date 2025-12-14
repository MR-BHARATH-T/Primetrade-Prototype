const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(200),
  password: z.string().min(8).max(72)
});

const loginSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(1).max(72)
});

module.exports = { registerSchema, loginSchema };
