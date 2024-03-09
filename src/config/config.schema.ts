import { z } from 'zod'

export const ConfigSchema = z
  .object({
    PORT: z.string().trim(),
    NODE_ENV: z.enum(['development', 'production']),
    REDIS_HOST: z.string().trim(),
    REDIS_EXPOSE_PORT: z.string().trim(),
    OTP_LENGTH: z
      .string()
      .transform((value) => parseInt(value, 10))
      .refine((value) => value > 0 && value <= 10, {
        message: 'OTP length must be between 1 and 10',
      }),
    INCLUDE_ALPHABETS: z
      .enum(['true', 'false'])
      .transform((value) => value === 'true'),
    INCLUDE_NUMBERS: z
      .enum(['true', 'false'])
      .transform((value) => value === 'true'),
    OTP_VALIDITY: z
      .string()
      .transform((value) => parseInt(value, 10))
      .refine((value) => value >= 300 && value <= 1800, {
        message: 'OTP validity must be between 5 and 30 minutes',
      }),
    MAX_ATTEMPTS: z
      .string()
      .transform((value) => parseInt(value, 10))
      .refine((value) => value >= 3 && value <= 5, {
        message: 'Maximum attempts must be between 3 and 5',
      }),
  })
  .refine(({ INCLUDE_ALPHABETS, INCLUDE_NUMBERS }) => {
    if (INCLUDE_ALPHABETS === true || INCLUDE_NUMBERS === true) {
      return true
    } else {
      throw new Error(
        'At least one of INCLUDE_ALPHABETS or INCLUDE_NUMBERS must be true',
      )
    }
  })

export type ConfigSchema = z.input<typeof ConfigSchema>
