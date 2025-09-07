import { z } from 'zod';
import { Config } from '@/constants/config.constants';
import { extractValuesAsTuple } from '@/utils/zod.utils';
import { Level } from 'pino';

const ENVS = extractValuesAsTuple(Config.ENVS);

export const ConfigSchema = z.object({
  /* Express App related variables */
  NODE_ENV: z.enum(ENVS),
  IS_ENV_PROD: z.boolean().optional(),
  API_PREFIX: z.string().refine(val => val.startsWith('/'), { message: "API_PREFIX must start with /" }),
  PORT: z.string()
    .length(4, { message: "PORT must be exactly 4 characters long" })
    .regex(/^\d+$/, { message: "PORT must contain only digits" })
    .transform(Number),

  /* Pino related variables */
  LOG_LEVEL: z.custom<Level>(),

  /* Mongo related variables */
  MONGO_URL: z.string(),

  /* SQL related varialbes */
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string()
    .length(4, { message: "PORT must be exactly 4 characters long" })
    .regex(/^\d+$/, { message: "PORT must contain only digits" })
    .transform(Number),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
  POSTGRES_MAX_POOL_CONNECTIONS: z.string().regex(/^[1-9]\d*$/, "POSTGRES_MAX_POOL_CONNECTIONS must be a positive number greater than 0 without 0 padding").transform(Number),
  POSTGRES_IDLE_TIMEOUT_MS: z.string().regex(/^[1-9]\d*$/, "POSTGRES_IDLE_TIMEOUT_MS must be a positive number greater than 0 without 0 padding").transform(Number),
  POSTGRES_CONNECTION_TIMEOUT_MS: z.string().regex(/^[1-9]\d*$/, "POSTGRES_CONNECTION_TIMEOUT_MS must be a positive number greater than 0 without 0 padding").transform(Number),
});
