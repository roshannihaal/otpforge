import { z } from 'zod'

export const ValidateOtpDTO = z.object({
  remainingAttempts: z.number(),
  otp: z.string().trim(),
})
export type ValidateOtpDTO = z.input<typeof ValidateOtpDTO>

export const ValidateOtpResponse = z.object({
  message: z.string().trim(),
  valid: z.boolean(),
  data: z
    .object({
      remainingAttempts: z.number().optional(),
      transactionId: z.string().trim().optional(),
    })
    .optional(),
})
export type ValidateOtpResponse = z.input<typeof ValidateOtpResponse>
