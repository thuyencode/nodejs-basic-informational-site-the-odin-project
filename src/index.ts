import http from 'http'

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Hello World!' }))
})

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}.`)
})
