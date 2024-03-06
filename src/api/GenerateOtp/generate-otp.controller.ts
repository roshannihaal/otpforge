import { Request, Response, NextFunction } from 'express'
import { GenerateEmailOtpDTO } from './generate-otp.dto'
import { generateOtp, generateTransactionId } from './generate-otp.service'
import { config } from '../../config'
import { addOtp, maskEmail } from '../../utils'

const otpLength = config.OTP_LENGTH
const otpValidityInMinutes = config.OTP_VALIDITY / 60

export const generateEmailOtp = async (
  req: Request<unknown, unknown, GenerateEmailOtpDTO>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body
    const maskedEmail = maskEmail(email)

    let otp = ''

    while (otp.length !== otpLength) {
      otp = generateOtp()
    }

    const transactionId = generateTransactionId()

    await addOtp(transactionId, otp)

    const message = `OTP sent to ${maskedEmail}. OTP is valid for ${otpValidityInMinutes} minutes.`

    const resStatusCode = 200
    res.status(resStatusCode).send({
      statusCode: resStatusCode,
      message,
      otp,
      transactionId,
    })
  } catch (error) {
    next(error)
  }
}