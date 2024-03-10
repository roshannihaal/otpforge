import { Router } from 'express'
import { validateRequest } from '../../middlewares'
import { VerifyOtpDTO } from './verify-otp.dto'
import * as controller from './verify-otp.controller'

const router = Router()

router.post('/', validateRequest({ body: VerifyOtpDTO }), controller.verifyOtp)

export const verifyRouter = router
