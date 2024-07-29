import { existsSync } from 'fs'
import fs from 'fs/promises'
import http, { IncomingMessage, ServerResponse } from 'http'
import { HttpMethod, HttpStatus } from 'http-status-ts'
import {
  HttpError,
  InternalServerError,
  MethodNotAllowed,
  NotFound
} from './errors/index.js'
import { getPath } from './routes.js'

/**
 * Logger middleware
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {CallableFunction} next
 */
function logger(
  req: IncomingMessage,
  res: ServerResponse,
  next: CallableFunction
) {
  console.info(`${req.method} ${req.url}`)
  next()
}

const server = http.createServer((req, res) => {
  logger(req, res, async () => {
    try {
      if (req.method !== HttpMethod.GET) {
        throw new MethodNotAllowed()
      }

      const route = getPath(req.url as string)

      if (route === undefined) {
        throw new NotFound()
      }

      if (!existsSync(route.filePath)) {
        throw new InternalServerError(`File ${route.filePath} doesn't exist`)
      }

      const data = await fs.readFile(route.filePath)

      res.writeHead(route.statusCode, route.contentType)
      res.write(data)
      res.end()
    } catch (error) {
      if (error instanceof NotFound) {
        res.writeHead(HttpStatus.FOUND, { location: '/404' })
        res.end()

        return
      }

      if (error instanceof InternalServerError) {
        console.error(error)
      }

      if (error instanceof HttpError) {
        res.writeHead(error.statusCode, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            error: { statusCode: error.statusCode, message: error.message }
          })
        )
      } else {
        console.error(error)
      }
    }
  })
})

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}.`)
})
