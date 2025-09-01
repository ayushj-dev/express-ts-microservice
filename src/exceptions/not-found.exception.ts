import { HttpStatus } from "@/constants/http-status.constants";
import { HttpError } from "./base.exception";

/**
 * 404 Not Found Error
 * Indicates that the server cannot find the requested resource.
 * This means the URL is not recognized.
 */
export class NotFoundError extends HttpError {
  constructor(message = 'The requested resource was not found.') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
