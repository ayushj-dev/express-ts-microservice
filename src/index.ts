import express from 'express';
import router from './routes';
import { errorHandler } from './middlewares/error-handler.middleware';

const app = express();

app.use("/", router);

app.use(errorHandler);

app.listen(3000, () => {
  console.log(`App running on port 3000`);
});
