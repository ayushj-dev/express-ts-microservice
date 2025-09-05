import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { asyncLocalStorage, RequestContext } from '@/context/context';
import { logger } from '@/utils/logger.utils';

export const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = randomUUID();

  logger.info({
    method: req.method,
    url: req.originalUrl,
    userAgent: req.headers['user-agent'] ?? "Unknown",
    ip: req.ip,
    requestId
  });

  const context: RequestContext = {
    requestId,
  };

  // Run the rest of the middleware chain and route handlers within this
  // AsyncLocalStorage context. This is the core of request-scoped data.
  asyncLocalStorage.run(context, () => {
    // Add more code here according to requirement
    next();
  });
}
