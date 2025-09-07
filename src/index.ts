import { CONFIG } from './config/config';
import { logger } from './utils/logger.utils';
import { mongoClient } from './db/no-sql/mongo-client';
import { createExpressApp } from './app/app';

/**
 * Function to start the server once all the prerequisites are satisfied like connecting to dbs etc.
 */
const startServer = async () => {
  try {
    /* Initialize DB connections first */
    await mongoClient.asPromise();
    logger.info(`Mongo DB client connected successfully!`);

    const app = createExpressApp();

    app.listen(CONFIG.PORT, () => {
      console.log(`Server is running on port ${CONFIG.PORT} in ${CONFIG.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error(error);

    /* Stop the server if any error occurs at the time of boot */
    process.exit(1);
  }
}

startServer();
