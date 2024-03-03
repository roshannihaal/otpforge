import { z } from 'zod'

export const ConfigSchema = z.object({
  PORT: z.string().trim(),
  NODE_ENV: z.enum(['development', 'production']),
  REDIS_HOST: z.string().trim(),
  REDIS_EXPOSE_PORT: z.string().trim(),
})

export type ConfigSchema = z.input<typeof ConfigSchema>
