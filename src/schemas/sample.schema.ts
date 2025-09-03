import { z } from "zod";

export const getSampleSchema = z.object({
  text: z.string()
});
