import { Router } from 'express'
import { generateRouter } from './GenerateOtp'
import { verifyRouter } from './VerifyOtp'

const router = Router()

router.use('/generate', generateRouter)

router.use('/verify', verifyRouter)

export const apiRouter = router
