import { HttpStatus, httpStatusTextByCode } from 'http-status-ts'
import HttpError from './HttpError.js'

/**
 * Internal Server Error
 *
 * @class InternalServerError
 * @typedef {InternalServerError}
 * @extends {HttpError}
 */
class InternalServerError extends HttpError {
  constructor() {
    super(
      httpStatusTextByCode(HttpStatus.INTERNAL_SERVER_ERROR),
      HttpStatus.INTERNAL_SERVER_ERROR
    )
  }
}

export default InternalServerError
