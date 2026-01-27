import type { Consumer, EachMessagePayload } from 'kafkajs';
import { kafka } from '@/kafka/client';
import { logger } from '@/utils/logger.utils';

export abstract class BaseKafkaConsumer {
  protected consumer: Consumer;
  protected readonly topics: string[];
  protected readonly groupId: string;

  constructor(topics: string[], groupId: string) {
    this.topics = topics;
    this.groupId = groupId;

    this.consumer = kafka.consumer({ groupId: this.groupId });
  }

  /* Abstract methods */
  protected abstract handleMessage(payload: EachMessagePayload): Promise<void>;

  public async start(): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topics: this.topics, fromBeginning: false });

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        try {
          await this.handleMessage(payload);
        } catch (error) {
          logger.error(`Error handling message from topic ${payload.topic}:`);
          logger.error(error);
        }
      },
    });

    logger.info(`Kafka consumer started.`);
  }

  public async stop(): Promise<void> {
    await this.consumer.disconnect();

    logger.info(`Kafka consumer disconnected.`);
  }
}
