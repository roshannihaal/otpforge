import { randomBytes, createHash, randomUUID } from 'crypto'
import { config } from '../../config'

const otpLength = config.OTP_LENGTH
const includeAlphabets = config.INCLUDE_ALPHABETS
const includeNumbers = config.INCLUDE_NUMBERS

export const generateOtp = (): string => {
  const randomString = randomBytes(otpLength).toString('hex')
  const hash = createHash('sha256')
  hash.update(randomString)
  const digest = hash.digest('hex')
  let otp = ''
  if (includeAlphabets && includeNumbers) {
    const alphaNumericString = digest
    otp = alphaNumericString.substring(0, otpLength).toUpperCase()
  } else if (includeAlphabets) {
    const alphaString = digest.replace(/\d/g, '')
    otp = alphaString.substring(0, otpLength).toUpperCase()
  } else {
    const numericString = digest.replace(/[a-zA-Z]/g, '')
    otp = numericString.substring(0, otpLength).toUpperCase()
  }
  return otp
}

export const generateTransactionId = (): string => {
  const transactionId = randomUUID()
  return transactionId
}
