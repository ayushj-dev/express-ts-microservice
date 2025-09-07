import dotenv from 'dotenv';
import { Config as ConfigConstants } from "@/constants/config.constants";
import { InternalServerError } from "@/exceptions";
import { ConfigSchema } from '@/schemas/config.schema';
import z from 'zod';

type Config = z.infer<typeof ConfigSchema>;

/**
 * Configuring dotenv to use correct .env file based on environment passed
 */
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
  quiet: true
});

/**
 * This class uses singleton pattern
 */
export class AppConfig implements Config {
  private static _instance: AppConfig;

  /* Express App related variables */
  public readonly NODE_ENV: Config['NODE_ENV'];
  public readonly IS_ENV_PROD: Config['IS_ENV_PROD'];
  public readonly API_PREFIX: Config['API_PREFIX'];
  public readonly PORT: Config['PORT'];

  /* Pino related variables */
  public readonly LOG_LEVEL: Config['LOG_LEVEL'];

  /* Mongo related variables */
  public readonly MONGO_URL: Config['MONGO_URL'];

  /* SQL related variables */
  public readonly POSTGRES_HOST: Config['POSTGRES_HOST'];
  public readonly POSTGRES_PORT: Config['POSTGRES_PORT'];
  public readonly POSTGRES_USER: Config['POSTGRES_USER'];
  public readonly POSTGRES_PASSWORD: Config['POSTGRES_PASSWORD'];
  public readonly POSTGRES_DATABASE: Config['POSTGRES_DATABASE'];
  public readonly POSTGRES_MAX_POOL_CONNECTIONS: Config['POSTGRES_MAX_POOL_CONNECTIONS'];
  public readonly POSTGRES_IDLE_TIMEOUT_MS: Config['POSTGRES_IDLE_TIMEOUT_MS'];
  public readonly POSTGRES_CONNECTION_TIMEOUT_MS: Config['POSTGRES_CONNECTION_TIMEOUT_MS'];

  /**
   * Private constructor to prevent direct instantiation
   */
  private constructor(env: Config) {
    /* Express App related variables */
    this.NODE_ENV = env.NODE_ENV;
    this.IS_ENV_PROD = env.NODE_ENV === ConfigConstants.ENVS.PROD;
    this.API_PREFIX = env.API_PREFIX;
    this.PORT = env.PORT;

    /* Pino related variables */
    this.LOG_LEVEL = env.LOG_LEVEL;

    /* Mongo related variables */
    this.MONGO_URL = env.MONGO_URL;

    /* SQL related varialbes */
    this.POSTGRES_HOST = env.POSTGRES_HOST;
    this.POSTGRES_PORT = env.POSTGRES_PORT;
    this.POSTGRES_USER = env.POSTGRES_USER;
    this.POSTGRES_PASSWORD = env.POSTGRES_PASSWORD;
    this.POSTGRES_DATABASE = env.POSTGRES_DATABASE;
    this.POSTGRES_MAX_POOL_CONNECTIONS = env.POSTGRES_MAX_POOL_CONNECTIONS;
    this.POSTGRES_IDLE_TIMEOUT_MS = env.POSTGRES_IDLE_TIMEOUT_MS;
    this.POSTGRES_CONNECTION_TIMEOUT_MS = env.POSTGRES_CONNECTION_TIMEOUT_MS;
  }

  /**
   * Public static method to get the singleton instance
   */
  public static get instance(): AppConfig {
    if (!AppConfig._instance) {

      const result = ConfigSchema.safeParse(process.env);

      if (!result.success) {
        throw new InternalServerError('Invalid environment variables');
      }

      AppConfig._instance = new AppConfig(result.data);
    }

    return Object.freeze(AppConfig._instance);
  }
}

export const CONFIG = AppConfig.instance;
