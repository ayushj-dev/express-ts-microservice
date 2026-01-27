import { KafkaConstants } from "@/constants/kafka.constants";
import { Mongo } from "@/constants/mongo.constants";
import { mongoClient } from "@/db/no-sql/mongo-client";
import { redis } from "@/db/redis/redis";
import { db } from "@/db/sql";
import { sampleTable } from "@/db/sql/schemas/sample.schema";
import { InternalServerError } from "@/exceptions";
import { kafkaProducer } from "@/kafka/producer";
import { GetSampleParams } from "@/types/sample.types";
import { and, eq } from "drizzle-orm";

export class SampleService {

  constructor() { }

  getSample(data: GetSampleParams) {
    return `Sample data: ${data.name} Age: ${data.age}`;
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

  async getValue() {
    try {
      const result = await redis.get("test_key");

      return result;
    } catch (err) {
      console.log(err);
      throw new InternalServerError();
    }
  }

  create() {
    return `Sample created successfully`;
  }

  update() {
    return `Sample updated successfully`;
  }

  delete() {
    return `Sample deleted successfully`;
  }

  async sendEvent() {
    try {
      await kafkaProducer.send(KafkaConstants.TOPICS.SAMPLE_CREATED, "user", {
        name: "John",
        age: 40
      });

      return `Sample event sent`;
    } catch (err) {
      console.log(err);
      throw new InternalServerError();
    }
  }
}
