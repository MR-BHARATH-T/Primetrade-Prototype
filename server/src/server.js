const { app } = require('./app');
const { connectDB } = require('./config/db');
const { env } = require('./config/env');

async function start() {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`API listening on http://localhost:${env.PORT}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
