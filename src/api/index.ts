import { Router } from 'express'
import { generateRouter } from './GenerateOtp'

const router = Router()

router.use('/generate', generateRouter)

export const apiRouter = router
