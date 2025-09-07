import { CONFIG } from './config/config';
import { logger } from './utils/logger.utils';
import { mongoClient } from './db/no-sql/mongo-client';
import { createExpressApp } from './app/app';
import { Server } from 'http';
import { setupGracefulShutdown } from '@/app/graceful-shutdown';

let server: Server;

const startServer = async () => {
  try {
    await mongoClient.asPromise();
    logger.info('Mongo DB client connected successfully!');

    const app = createExpressApp();

    server = app.listen(CONFIG.PORT, () => {
      logger.info(`Server running on port ${CONFIG.PORT} in ${CONFIG.NODE_ENV} mode`);
    });

    // Setup graceful shutdown with server reference
    setupGracefulShutdown(server);

  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

startServer();
