import { existsSync } from 'fs'
import fs from 'fs/promises'
import http, { IncomingMessage, ServerResponse } from 'http'
import { HttpError, InternalServerError, NotFound } from './errors/index.js'
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
      const route = getPath(req.url as string)

      if (route === undefined) {
        throw new NotFound()
      }

      if (!existsSync(route.filePath)) {
        throw new InternalServerError()
      }

      const data = await fs.readFile(route.filePath)

      res.writeHead(route.statusCode, route.contentType)
      res.write(data)
      res.end()
    } catch (error) {
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
