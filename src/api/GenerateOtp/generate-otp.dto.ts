import { z } from 'zod'

export const GenerateEmailOtpDTO = z.object({
  email: z
    .string({
      required_error: 'Email id is required',
      invalid_type_error: 'Email should be a string',
    })
    .trim()
    .email({ message: 'Invalid email' }),
})
export type GenerateEmailOtpDTO = z.input<typeof GenerateEmailOtpDTO>
