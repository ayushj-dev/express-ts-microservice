import { Router } from 'express';
import { SampleController } from '@/controllers/sample.controller';
import { validateSchema } from '@/middlewares/schema-validator.middleware';
import { getSampleSchema } from '@/schemas/sample.schema';
import { SampleService } from '@/services/sample.service';

const sampleRouter = Router();

const sampleService = new SampleService();

const sampleController = new SampleController(sampleService);

/* Routes start here */

sampleRouter.get('/validator-example', validateSchema(getSampleSchema), sampleController.getSample);
sampleRouter.get('/mongoose', sampleController.getDocuments);
sampleRouter.get('/postgres', sampleController.getSampleRows);
sampleRouter.get('/redis', sampleController.getValue);
sampleRouter.get('/kafka-producer', sampleController.sendEvent);

/* Routes end here */

export { sampleRouter };
