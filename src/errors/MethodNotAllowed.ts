import { HttpStatus, httpStatusTextByCode } from 'http-status-ts'
import HttpError from './HttpError.js'

/**
 * Method Not Allowed error
 *
 * @class MethodNotAllowed
 * @typedef {MethodNotAllowed}
 * @extends {HttpError}
 */
class MethodNotAllowed extends HttpError {
  constructor() {
    super(
      httpStatusTextByCode(HttpStatus.METHOD_NOT_ALLOWED),
      HttpStatus.METHOD_NOT_ALLOWED
    )
  }
}

export default MethodNotAllowed
