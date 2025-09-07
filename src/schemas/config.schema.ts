import { z } from 'zod';
import { Config } from '@/constants/config.constants';
import { extractValuesAsTuple } from '@/utils/zod.utils';
import { Level } from 'pino';

/* Error message constant */
const Errors = {
  PORT: {
    LENGTH: "PORT must be exactly 4 characters long",
    REGEX: "PORT must contain only digits"
  }
} as const;

const ENVS = extractValuesAsTuple(Config.ENVS);

export const ConfigSchema = z.object({
  /* Express App related variables */
  NODE_ENV: z.enum(ENVS),
  IS_ENV_PROD: z.boolean().optional(),
  API_PREFIX: z.string().refine(val => val.startsWith('/'), { message: "API_PREFIX must start with /" }),
  PORT: z.string()
    .length(4, { message: Errors.PORT.LENGTH })
    .regex(/^\d+$/, { message: Errors.PORT.REGEX })
    .transform(Number),

  /* Pino related variables */
  LOG_LEVEL: z.custom<Level>(),

  /* Mongo related variables */
  MONGO_URL: z.string(),

  /* SQL related variables */
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string()
    .length(4, { message: Errors.PORT.LENGTH })
    .regex(/^\d+$/, { message: Errors.PORT.REGEX })
    .transform(Number),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
  POSTGRES_MAX_POOL_CONNECTIONS: z.string()
    .regex(/^[1-9]\d*$/, "POSTGRES_MAX_POOL_CONNECTIONS must be a positive number greater than 0 without 0 padding")
    .transform(Number),
  POSTGRES_IDLE_TIMEOUT_MS: z.string()
    .regex(/^[1-9]\d*$/, "POSTGRES_IDLE_TIMEOUT_MS must be a positive number greater than 0 without 0 padding")
    .transform(Number),
  POSTGRES_CONNECTION_TIMEOUT_MS: z.string()
    .regex(/^[1-9]\d*$/, "POSTGRES_CONNECTION_TIMEOUT_MS must be a positive number greater than 0 without 0 padding")
    .transform(Number),

  /* Redis related variables */
  REDIS_HOST: z.union([z.ipv4(), z.ipv6()]),
  REDIS_PORT: z.string()
    .length(4, { message: Errors.PORT.LENGTH })
    .regex(/^\d+$/, { message: Errors.PORT.REGEX })
    .transform(Number),
  REDIS_USER: z.string(),
  REDIS_PASSWORD: z.string()
});
