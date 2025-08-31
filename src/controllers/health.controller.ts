import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '@/constants/http-status.constants';
import { HealthService } from '@/services/health.service';

export class HealthController {

  constructor(private healthService: HealthService) { }

  checkHealth = (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = this.healthService.checkHealth();

      res.status(HttpStatus.OK).json({
        message: "Health fetched successfully!",
        data: {
          meta: {},
          result
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
