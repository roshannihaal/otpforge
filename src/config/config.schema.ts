import { z } from 'zod'

export const ConfigSchema = z.object({
  PORT: z.string().trim(),
  NODE_ENV: z.enum(['development', 'production']),
  REDIS_HOST: z.string().trim(),
  REDIS_EXPOSE_PORT: z.string().trim(),
  OTP_LENGTH: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((value) => value > 0, {
      message: 'OTP length must be greater than 0',
    }),
  INCLUDE_ALPHABETS: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true'),
  INCLUDE_NUMBERS: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true'),
})

export type ConfigSchema = z.input<typeof ConfigSchema>
