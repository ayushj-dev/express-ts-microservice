import { CONFIG } from "@/config/config";
import Redis from "ioredis";

export const redis = new Redis({
  host: CONFIG.REDIS_HOST,
  port: CONFIG.REDIS_PORT,
  username: CONFIG.REDIS_USER,
  password: CONFIG.REDIS_PASSWORD
});
