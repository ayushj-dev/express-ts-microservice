import { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/logger.utils';
import { getContext } from '@/context/context';

/**
 * Standard API response
 */
type ApiResponse = {
  message: string;
  data: {
    meta: any;
    result: any;
  }
};

type ApiResponseData = ApiResponse['data'] | null;

/**
 * Type for the standardized response structure.
 * This defines the consistent format for all API responses.
 */
type StandardizedResponse = {
  success: boolean;
  request_id: string;
  message: string;
  data: ApiResponseData;
  error: any | null;
}

/**
 * Response middleware responsible for below:
 *    - Makes sure that every response is in a standard format/structure
 *    - Logs every response
 */
export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function (body: StandardizedResponse | ApiResponse): Response {

    /* If the body contains error then return it without modifying since error handler has already sent response in standard structure */
    if (isStandardizedResponse(body) && body.success === false && res.statusCode >= 400) {
      return originalJson.call(this, body);
    }

    const requestId = getContext('requestId') as string;

    const standardizedResponse: StandardizedResponse = {
      success: true,
      request_id: requestId,
      message: body.message ?? "Operation successful",
      data: body.data ?? null,
      error: null
    };

    logger.info({
      method: req.method,
      url: req.originalUrl,
      ...standardizedResponse
    });

    /* We use `call(this, ...)` to ensure `this` context (which is `res`) is preserved. */
    return originalJson.call(this, standardizedResponse);
  };

  next();
}

/**
 * Type guard for standardized response
 */
const isStandardizedResponse = (obj: any): obj is StandardizedResponse => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.success === 'boolean' &&
    typeof obj.message === 'string' &&
    'data' in obj &&
    (
      obj.data === null ||
      (
        typeof obj.data === 'object' &&
        obj.data !== null &&
        'meta' in obj.data &&
        'result' in obj.data
      )
    ) &&
    ('error' in obj)
  );
}
