import { Router } from 'express'
import { validateRequest } from '../../middlewares'
import { GenerateEmailOtpDTO } from './generate-otp.dto'
import * as controller from './generate-otp.controller'

const router = Router()

router.post(
  '/email',
  validateRequest({ body: GenerateEmailOtpDTO }),
  controller.generateEmailOtp,
)

export const generateRouter = router
