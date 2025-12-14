const { z } = require('zod');

const patchMeSchema = z.object({
  name: z.string().min(2).max(80).optional()
});

module.exports = { patchMeSchema };
