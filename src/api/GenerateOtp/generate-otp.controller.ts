import { Request, Response, NextFunction } from 'express'
import { GenerateEmailOtpDTO } from './generate-otp.dto'
import { generateOtp, generateTransactionId } from './generate-otp.service'
import { config } from '../../config'
import { addOtp, maskEmail } from '../../utils'

const otpLength = config.OTP_LENGTH

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

    const resStatusCode = 200
    res.status(resStatusCode).send({
      statusCode: resStatusCode,
      message: `OTP Sent to ${maskedEmail}`,
      otp,
      transactionId,
    })
  } catch (error) {
    next(error)
  }
}
