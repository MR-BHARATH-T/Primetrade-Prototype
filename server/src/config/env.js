const dotenv = require('dotenv');
const path = require('path');

// Only load .env file in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}

const required = ['MONGODB_URI', 'JWT_SECRET', 'CLIENT_ORIGIN'];
for (const key of required) {
  console.log(`Checking ${key}:`, process.env[key] ? 'SET' : 'NOT SET');
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

module.exports = { env };
