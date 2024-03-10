import { z } from 'zod'

export const VerifyOtpDTO = z.object({
  transactionId: z
    .string({
      required_error: 'transactionId is required',
      invalid_type_error: 'transactionId should be a string',
    })
    .trim(),
  otp: z
    .string({
      required_error: 'otp is required',
      invalid_type_error: 'otp should be a string',
    })
    .trim(),
})
export type VerifyOtpDTO = z.input<typeof VerifyOtpDTO>
