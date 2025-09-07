import { Server } from 'http';
import { mongoClient } from '../db/no-sql/mongo-client';
import { logger } from '@/utils/logger.utils';
import { initiateShutdown, getActiveRequestCount, isAppShuttingdown } from '@/middlewares/request.middleware';

/**
 * Graceful shutdown handler
 * @param server HTTP server instance to close
 */
export const setupGracefulShutdown = (server: Server) => {
  const handleShutdown = async () => {

    const shuttingDown = isAppShuttingdown();

    if (shuttingDown) return; // Prevent double shutdown

    logger.info('\n-------- APP SHUTTING DOWN --------\n');

    // Tell middleware to reject new requests
    initiateShutdown();

    // Stop accepting new connections
    server.close(async (err) => {
      if (err) {
        logger.error(`Error closing server: ${JSON.stringify(err)}`);
        process.exit(1);
      }

      logger.info('Stopped accepting new connections.');

      // Wait for active requests to finish
      await waitForActiveRequestsToFinish();

      // Close DB connection
      await mongoClient.close();
      logger.info('MongoDB client disconnected.');

      logger.info('\n-------- APP SHUTDOWN SUCCESSFULLY --------\n');
      process.exit(0);
    });

    // Force shutdown after timeout
    setTimeout(() => {
      logger.warn('Forcing shutdown after timeout...');
      process.exit(1);
    }, 10000);
  };

  // Bind signals
  process.on('SIGINT', handleShutdown);
  process.on('SIGTERM', handleShutdown);
};


/**
 * Returns a promise that resolves when all active requests have completed.
 */
const waitForActiveRequestsToFinish = (): Promise<void> => {
  return new Promise((resolve) => {

    let activeRequests = getActiveRequestCount();

    if (activeRequests === 0) return resolve();

    const interval = setInterval(() => {

      activeRequests = getActiveRequestCount();

      if (activeRequests === 0) {

        clearInterval(interval);

        logger.info('All active HTTP requests have completed.');

        resolve();
      }
    }, 500);
  });
};
