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

  public readonly NODE_ENV: Config['NODE_ENV'];
  public readonly IS_ENV_DEV: Config['IS_ENV_DEV'];
  public readonly API_PREFIX: Config['API_PREFIX'];
  public readonly PORT: Config['PORT'];

  /**
   * Private constructor to prevent direct instantiation
   */
  private constructor(env: Config) {
    /* Express App related variables */
    this.NODE_ENV = env.NODE_ENV;
    this.IS_ENV_DEV = env.NODE_ENV === ConfigConstants.ENVS.DEV;
    this.API_PREFIX = env.API_PREFIX;
    this.PORT = env.PORT;
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
