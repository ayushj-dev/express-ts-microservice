import { logger } from '@/utils/logger.utils';
import { Request, Response, NextFunction } from 'express';

export const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
logger.info({
    method: req.method,
    url: req.originalUrl,
    userAgent: req.headers['user-agent'] ?? "Unknown",
    ip: req.ip
  });

  next();
}
