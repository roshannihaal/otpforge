import { config } from '../config'
import { createClient, RedisClientType } from 'redis'

const redisHost = config.REDIS_HOST
const redisPort = config.REDIS_EXPOSE_PORT
const otpValidity = config.OTP_VALIDITY

const client: RedisClientType = createClient({
  url: `redis://${redisHost}:${redisPort}`,
})

export const connectToRedis = async () => {
  await client.connect()
  await client.set('key', 'value')
}

export const addOtp = async (key: string, value: string) => {
  try {
    const currTime = Math.round(+new Date() / 1000)
    const otpExpTime = currTime + otpValidity

    await client.set(key, value, {
      EXAT: otpExpTime,
    })
  } catch (error) {
    throw error
  }
}
