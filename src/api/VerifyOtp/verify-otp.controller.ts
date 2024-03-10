import { Request, Response, NextFunction } from 'express'
import { VerifyOtpDTO } from './verify-otp.dto'
import { validateOtp } from '../../utils'

export const verifyOtp = async (
  req: Request<unknown, unknown, VerifyOtpDTO>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { transactionId, otp } = req.body
    const { valid, ...result } = await validateOtp(transactionId, otp)

    let resStatusCode: number
    if (valid) {
      resStatusCode = 200
    } else {
      resStatusCode = 400
    }
    const response = {
      ...result,
      statusCode: resStatusCode,
    }
    res.status(resStatusCode).send(response)
  } catch (error) {
    next(error)
  }
}
