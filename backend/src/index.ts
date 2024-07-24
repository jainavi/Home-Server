import dotenv from 'dotenv';

import { httpServer, io } from './app';
import logger from './utils/logger';
import { initializeSocketIO } from './socket';
import { showCurrentJobs } from './utils/printer';
import { SocketEvents } from './utils/enums';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

const PORT = process.env.PORT || 3000;
let printJobInterval: NodeJS.Timeout;

const emitPrintJobsStatus = async () => {
  // logger.log('Getting print jobs status...');
  const printJobs = await showCurrentJobs();
  // logger.log('Pending print jobs', printJobs);

  io.emit(SocketEvents.printJobStatus, printJobs);
};

httpServer.listen(PORT, () => {
  initializeSocketIO(io);
  printJobInterval = setInterval(emitPrintJobsStatus, 5000);
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
