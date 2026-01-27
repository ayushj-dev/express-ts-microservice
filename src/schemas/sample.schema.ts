import { z } from "zod";

export const getSampleSchema = z.object({
  name: z.string(),
  age: z.number()
});
