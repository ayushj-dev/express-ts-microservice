import { HttpStatus } from "@/constants/http-status.constants";
import { HttpError } from "./base.exception";

/**
 * 401 Unauthorized Error
 * Indicates that the request has not been applied because it lacks valid
 * authentication credentials for the target resource.
 */
export class UnauthorizedError extends HttpError {
  constructor(message = 'Authentication required or invalid credentials.') {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
