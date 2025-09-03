import { getSampleSchema } from "@/schemas/sample.schema";
import { z } from "zod";

export type GetSampleParams = z.infer<typeof getSampleSchema>;
