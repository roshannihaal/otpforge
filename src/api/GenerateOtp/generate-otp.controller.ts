import { Request, Response, NextFunction } from 'express'
import { GenerateEmailOtpDTO } from './generate-otp.dto'
import { generateOtp, generateTransactionId } from './generate-otp.service'
import { config } from '../../config'
import {
  addOtp,
  maskEmail,
  readHTML,
  substituteTemplate,
  sendEmail,
} from '../../utils'

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

    const remainingAttempts = await addOtp(transactionId, otp)

    const template = readHTML()

    const substitutedTemplate = substituteTemplate(template, otp)

    await sendEmail(email, substitutedTemplate)

    const message = `OTP sent to ${maskedEmail}. OTP is valid for ${otpValidityInMinutes} minutes.`

    const resStatusCode = 200
    res.status(resStatusCode).send({
      statusCode: resStatusCode,
      message,
      data: {
        transactionId,
        remainingAttempts,
      },
    })
  } catch (error) {
    next(error)
  }
}
