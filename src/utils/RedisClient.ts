import { config } from '../config'
import { createClient, RedisClientType } from 'redis'

const redisHost = config.REDIS_HOST
const redisPort = config.REDIS_EXPOSE_PORT

const client: RedisClientType = createClient({
  url: `redis://${redisHost}:${redisPort}`,
})

export const connectToRedis = async () => {
  await client.connect()
  await client.set('key', 'value')
}
