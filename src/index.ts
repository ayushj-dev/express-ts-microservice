import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { CONFIG } from './config/config';
import { requestMiddleware } from './middlewares/request.middleware';
import { responseMiddleware } from './middlewares/response.middleware';
import { errorHandler } from './middlewares/error-handler.middleware';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestMiddleware);

app.use(responseMiddleware);

app.use(CONFIG.API_PREFIX, routes);

app.use(errorHandler);

app.listen(CONFIG.PORT, () => {
  console.log(`App running on port ${CONFIG.PORT}`);
});
