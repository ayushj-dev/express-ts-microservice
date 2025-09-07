import { getCurrentDateTimeinJSDate } from "@/utils/date-time.utils";
import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const sampleTable = pgTable("sample", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sample_text: text().notNull(),
  is_active: boolean().default(true),
  is_deleted: boolean().default(false),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull().$onUpdate(() => getCurrentDateTimeinJSDate())
});
