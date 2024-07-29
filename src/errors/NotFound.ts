import { HttpStatus, httpStatusTextByCode } from 'http-status-ts'
import HttpError from './HttpError.js'

/**
 * Not Found error
 *
 * @class NotFound
 * @typedef {NotFound}
 * @extends {HttpError}
 */
class NotFound extends HttpError {
  constructor() {
    super(httpStatusTextByCode(HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND)
  }
}

export default NotFound
