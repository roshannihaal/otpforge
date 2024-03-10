import { config } from '../config'
import { createClient, RedisClientType } from 'redis'
import { ValidateOtpDTO, ValidateOtpResponse } from './utils.dto'

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

export const addOtp = async (
  transactionId: string,
  otp: string,
): Promise<number> => {
  try {
    const currTime = Math.round(+new Date() / 1000)
    const otpExpTime = currTime + otpValidity
    const value = {
      otp,
      remainingAttempts: maxAttempts,
    }

    await client.json.set(transactionId, '$', value)
    await client.expireAt(transactionId, otpExpTime)

    return maxAttempts
  } catch (error) {
    throw error
  }
}

export const validateOtp = async (
  transactionId: string,
  otp: string,
): Promise<ValidateOtpResponse> => {
  try {
    const res = await client.json.get(transactionId)

    if (!res) {
      // Wrong transactionId
      const response = {
        valid: false,
        message: 'Invalid TransactionId',
      }
      return response
    }

    const data = ValidateOtpDTO.parse(res)

    if (data.otp === otp) {
      // Correct OTP
      const response = {
        valid: true,
        message: 'OTP Verified',
        data: {
          transactionId,
        },
      }
      client.del(transactionId)
      return response
    } else {
      // Wrong OTP
      const remainingAttempts = data.remainingAttempts - 1
      if (remainingAttempts > 0) {
        // Attempts remaining
        const value = {
          otp: data.otp,
          remainingAttempts,
        }
        await client.json.set(transactionId, '$', value)
      } else {
        // Attempts exceeded
        client.del(transactionId)
      }
      const response = {
        valid: false,
        message: 'Invalid OTP',
        data: {
          remainingAttempts,
          transactionId,
        },
      }
      return response
    }
  } catch (error) {
    throw error
  }
}
