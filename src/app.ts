import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import { connectToRedis } from './utils'
const app = express()

app.use(express.json({ limit: '1mb' }))

app.use(cors())
app.use(helmet())
app.use(hpp())

app.disable('x-powered-by')

try {
  connectToRedis()
} catch (error) {
  console.error(`Seriver initialization error: ${error}`)
  process.exit(1)
}

app.get('/', (req, res) => {
  const resStatusCode = 200
  return res
    .status(resStatusCode)
    .send({ statusCode: resStatusCode, message: 'Hello World!' })
})

export default app
