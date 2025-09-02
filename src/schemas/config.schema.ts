import { z } from 'zod';
import { Config } from '@/constants/config.constants';
import { extractValuesAsTuple } from '@/utils/zod.utils';
import { Level } from 'pino';

const ENVS = extractValuesAsTuple(Config.ENVS);

export const ConfigSchema = z.object({
  /* Express App related variables */
  NODE_ENV: z.enum(ENVS),
  IS_ENV_DEV: z.boolean().optional(),
  IS_ENV_EXAMPLE: z.boolean().optional(),
  API_PREFIX: z.string().refine(val => val.startsWith('/'), { message: "API_PREFIX must start with /" }),
  PORT: z.string()
    .length(4, { message: "PORT must be exactly 4 characters long" })
    .regex(/^\d+$/, { message: "PORT must contain only digits" })
    .transform(Number),

  /* Pino related variables */
  LOG_LEVEL: z.custom<Level>()
});
