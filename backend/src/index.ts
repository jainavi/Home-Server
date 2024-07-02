import app from './app';
import dotenv from 'dotenv';
import logger from './utils/logger';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.log(`Server is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (error) => {
  logger.error(error, error.stack);
  logger.cleanup();
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  if (error instanceof Error) logger.error(error);
  else logger.error(new Error(`Unhandled rejection: ${error}`));

  logger.cleanup();
  process.exit(1);
});