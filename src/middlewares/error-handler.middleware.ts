import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@/constants/http-status.constants';
import { HttpError } from '@/exceptions/base.exception';
import { ZodError } from 'zod';
import { logger } from '@/utils/logger.utils';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof HttpError ? err.statusCode : HttpStatus.INTERNAL_SERVER_ERROR;

  let message = err.message ?? "Internal Server Error";
  let error = null;

  if (err instanceof ZodError) {
    message = "Schema Error";
    error = err.issues;
  }

  else if (err instanceof HttpError) {
    error = err.stack;
  }

  logger.error(err);

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error
  });
};
