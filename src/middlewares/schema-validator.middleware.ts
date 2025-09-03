import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export const validateSchema = (schema: ZodType<any, any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        ...req.query,
        ...req.params,
        ...req.body
      };

      const result = schema.parse(payload);

      req.data = result;

      next();
    } catch (err) {
      next(err);
    }
  }
}
