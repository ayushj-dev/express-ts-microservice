import { HttpStatus } from "@/constants/http-status.constants";
import { HttpError } from "./base.exception";

/**
 * 429 Too Many Requests Error (from your original example)
 * Indicates that the user has sent too many requests in a given amount of time ("rate limiting").
 */
export class TooManyRequestsError extends HttpError {
  constructor(message = 'Too many requests, please try again later.') {
    super(HttpStatus.TOO_MANY_REQUESTS, message);
  }
}
