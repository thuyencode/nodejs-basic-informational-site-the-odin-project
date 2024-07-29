import { HttpStatus, httpStatusTextByCode } from 'http-status-ts'
import HttpError from './HttpError.js'

class InternalServerError extends HttpError {
  constructor() {
    super(
      httpStatusTextByCode(HttpStatus.INTERNAL_SERVER_ERROR),
      HttpStatus.INTERNAL_SERVER_ERROR
    )
  }
}

export default InternalServerError
