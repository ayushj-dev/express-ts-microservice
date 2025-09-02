import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@/constants/http-status.constants';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err?.message ?? "Internal Server Error";
  const stack = err.stack;

  res.status(statusCode).json({
    success: false,
    status_code: statusCode,
    message,
    error: stack
  });
};
