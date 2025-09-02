import express from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/error-handler.middleware';
import { CONFIG } from './config/config';

const app = express();

app.use(CONFIG.API_PREFIX, routes);

app.use(errorHandler);

app.listen(CONFIG.PORT, () => {
  console.log(`App running on port ${CONFIG.PORT}`);
});
