import { HttpStatus } from "@/constants/http-status.constants";
import { HttpError } from "./base.exception";

/**
 * 400 Bad Request Error
 * Indicates that the server cannot or will not process the request due to something
 * that is perceived to be a client error (e.g., malformed request syntax,
 * invalid request message framing, or deceptive request routing).
 */
export class BadRequestError extends HttpError {
  constructor(message = "The request was malformed or invalid.") {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
