/* Do not change the order of imports as it is crucial in order for app to work as expected */
import { CONFIG } from "@/config/config";
import helmet from 'helmet';
import cors from 'cors';
import express, { Express } from 'express';
import { errorHandler } from "@/middlewares/error-handler.middleware";
import { responseMiddleware } from "@/middlewares/response.middleware";
import { requestMiddleware } from "@/middlewares/request.middleware";
import routes from '@/routes';

/**
* Function to initialize a fresh express app instance with middlewares and routes
*
* IMPORTANT: If you are not sure then DO NOT CHANGE THE ORDER OF MIDDLEWARES & add newer ones between the comments
*/
export const createExpressApp = (): Express => {
  const app = express();

  /* Security Middlewares */
  app.use(helmet());
  app.use(cors());

  /* Body parser */
  app.use(express.json());

  /* For parsing application/x-www-form-urlencoded */
  app.use(express.urlencoded({ extended: true }));

  /* Request logger middleware to log requests */
  app.use(requestMiddleware);

  /* Response middleware to standardize response structure */
  app.use(responseMiddleware);

  /* Add your middlewares below this comment */

  /* Add your middlewares above this comment */

  /* Entry point for routes */
  app.use(CONFIG.API_PREFIX, routes);

  /* Centralized Error Handling */
  app.use(errorHandler);

  return app;
}
