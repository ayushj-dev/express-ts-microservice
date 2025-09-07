import { defineConfig } from "drizzle-kit";
import { CONFIG } from "./src/config/config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/sql/schemas",
  dbCredentials: {
    host: CONFIG.POSTGRES_HOST,
    port: CONFIG.POSTGRES_PORT,
    user: CONFIG.POSTGRES_USER,
    password: CONFIG.POSTGRES_PASSWORD,
    database: CONFIG.POSTGRES_DATABASE,
    ssl: false
  },
});
