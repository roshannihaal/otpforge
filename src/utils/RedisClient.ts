import { config } from '../config'
import { createClient, RedisClientType } from 'redis'

const redisHost = config.REDIS_HOST
const redisPort = config.REDIS_EXPOSE_PORT
const otpValidity = config.OTP_VALIDITY
const maxAttempts = config.MAX_ATTEMPTS

const client: RedisClientType = createClient({
  url: `redis://${redisHost}:${redisPort}`,
})

export const connectToRedis = async () => {
  await client.connect()
  await client.set('key', 'value')
}

export const addOtp = async (transactionId: string, otp: string) => {
  try {
    const currTime = Math.round(+new Date() / 1000)
    const otpExpTime = currTime + otpValidity
    const value = {
      otp,
      remainingAttempts: maxAttempts,
    }

    await client.json.set(transactionId, '$', value)
    await client.expireAt(transactionId, otpExpTime)
  } catch (error) {
    throw error
  }
}
