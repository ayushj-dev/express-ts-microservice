import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { asyncLocalStorage, RequestContext } from '@/context/context';
import { logger } from '@/utils/logger.utils';

let activeRequests = 0;
let shuttingDown = false;

export const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {

  if (shuttingDown) {
    res.set('Connection', 'close');
    res.status(503).send('Server is shutting down');
    return;
  }

  activeRequests++;
  console.log(`New Request`, activeRequests);

  res.on('finish', () => { activeRequests--; console.log(`Finished Request`, activeRequests) });

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

  /*
    Run the rest of the middleware chain and route handlers within this
    AsyncLocalStorage context. This is the core of request-scoped data.
  */
  asyncLocalStorage.run(context, () => {
    // Add more code here according to requirement
    next();
  });
}

/**
 * Signal that shutdown has started — reject new requests.
 */
export const initiateShutdown = () => { shuttingDown = true; };

export const isAppShuttingdown = () => shuttingDown;

export const getActiveRequestCount = () => activeRequests;
