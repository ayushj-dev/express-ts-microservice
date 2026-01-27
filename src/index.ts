import type { Server } from 'node:http';
import { createExpressApp } from '@/app/app';
import { setupGracefulShutdown } from '@/app/graceful-shutdown';
import { CONFIG } from '@/config/config';
import { mongoClient } from '@/db/no-sql/mongo-client';
import { sampleConsumer } from '@/kafka/consumers/sample.consumer';
import { kafkaProducer } from '@/kafka/producer';
import { logger } from '@/utils/logger.utils';

let server: Server;

const startServer = async () => {
  try {
    await mongoClient.asPromise();
    logger.info('Mongo DB client connected successfully!');

    await kafkaProducer.connect();

    await sampleConsumer.start();

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
