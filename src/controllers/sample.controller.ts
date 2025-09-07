import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '@/constants/http-status.constants';
import { SampleService } from '@/services/sample.service';

export class SampleController {

  constructor(private sampleService: SampleService) { }

  getSample = (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = this.sampleService.getSample(req.data);

      res.status(HttpStatus.OK).json({
        message: "Sample fetched successfully!",
        data: {
          meta: {},
          result
        }
      });
    } catch (error) {
      next(error);
    }
  }

  getDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.sampleService.getDocuments();

      res.status(HttpStatus.OK).json({
        message: "Sample documents fetched successfully!",
        data: {
          meta: {},
          result
        }
      });
    } catch (error) {
      next(error);
    }
  }

  getSampleRows = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.sampleService.getSampleRows();

      res.status(HttpStatus.OK).json({
        message: "Sample rows fetched successfully!",
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
