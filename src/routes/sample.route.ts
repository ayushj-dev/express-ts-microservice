import { Router } from 'express';
import { SampleController } from '@/controllers/sample.controller';
import { SampleService } from '@/services/sample.service';
import { validateSchema } from '@/middlewares/schema-validator.middleware';
import { getSampleSchema } from '@/schemas/sample.schema';

const sampleRouter = Router();

const sampleService = new SampleService();

const sampleController = new SampleController(sampleService);

/* Routes start here */

sampleRouter.get('/validator-example', validateSchema(getSampleSchema), sampleController.getSample);

/* Routes end here */

export { sampleRouter };
