import { CONFIG } from "@/config/config";
import mongoose, { Connection } from "mongoose";
import { SampleSchema } from "./schemas/sample.schema";
import { Mongo } from "@/constants/mongo.constants";

let client: Connection | null = null;

const createConnection = (): Connection => {
  try {
    if (client) return client;

    client = mongoose.createConnection(CONFIG.MONGO_URL);

    /* Register models here */

    client.model(Mongo.MODELS.SAMPLE, SampleSchema);

    /* Register models here */

    return client;
  } catch (error) {
    throw new Error(`Mongo DB client failed to connect to the server, ${error}`);
  }
}

export const mongoClient = createConnection();
