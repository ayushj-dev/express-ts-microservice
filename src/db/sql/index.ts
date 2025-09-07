import { CONFIG } from "@/config/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  host: CONFIG.POSTGRES_HOST,
  user: CONFIG.POSTGRES_USER,
  password: CONFIG.POSTGRES_PASSWORD,
  database: CONFIG.POSTGRES_DATABASE,
  port: CONFIG.POSTGRES_PORT,
  max: CONFIG.POSTGRES_MAX_POOL_CONNECTIONS,
  idleTimeoutMillis: CONFIG.POSTGRES_IDLE_TIMEOUT_MS,
  connectionTimeoutMillis: CONFIG.POSTGRES_CONNECTION_TIMEOUT_MS
});

export const db = drizzle(pool, { logger: CONFIG.IS_ENV_PROD ? false : true });
