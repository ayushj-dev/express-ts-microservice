import { Mongo } from "@/constants/mongo.constants";
import { mongoClient } from "@/db/no-sql/mongo-client";
import { db } from "@/db/sql";
import { sampleTable } from "@/db/sql/schemas/sample.schema";
import { InternalServerError } from "@/exceptions";
import { GetSampleParams } from "@/types/sample.types";
import { and, eq } from "drizzle-orm";

export class SampleService {

  constructor() { }

  getSample(data: GetSampleParams) {
    return `Sample data: ${data.text}`;
  }

  async getDocuments() {
    try {
      const result = await mongoClient.model(Mongo.MODELS.SAMPLE).find();

      return result;
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async getSampleRows() {
    try {
      const result = await db
        .select()
        .from(sampleTable)
        .where(
          and(
            eq(sampleTable.is_active, true),
            eq(sampleTable.is_deleted, false)
          )
        );

      return result;
    } catch (err) {
      console.log(err);
      throw new InternalServerError();
    }
  }
}
