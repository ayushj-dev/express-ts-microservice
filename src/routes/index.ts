import { Router } from 'express';
import { healthRouter } from './health.route';
import { notFoundRouter } from './not-found.route';
import { sampleRouter } from './sample.route';

const router = Router();

router.use('/health', healthRouter);
router.use('/sample', sampleRouter);

/* Do not change position of not found router. This should always be called at last. */
router.use(notFoundRouter);

export default router;
