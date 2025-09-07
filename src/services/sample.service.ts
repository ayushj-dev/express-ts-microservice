import { Mongo } from "@/constants/mongo.constants";
import { mongoClient } from "@/db/no-sql/mongo-client";
import { InternalServerError } from "@/exceptions";
import { GetSampleParams } from "@/types/sample.types";

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
}
