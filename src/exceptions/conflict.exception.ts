import { HttpStatus } from "@/constants/http-status.constants";
import { HttpError } from "./base.exception";

/**
 * 409 Conflict Error
 * Indicates a request conflict with the current state of the target resource.
 * This code is used in situations where the user might be able to resolve the conflict
 * and resubmit the request.
 */
export class ConflictError extends HttpError {
  constructor(message = 'The request could not be completed due to a conflict with the current state of the resource.') {
    super(HttpStatus.CONFLICT, message);
  }
}
