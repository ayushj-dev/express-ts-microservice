import type { EachMessagePayload } from 'kafkajs';
import { KafkaConstants } from '@/constants/kafka.constants';
import { BaseKafkaConsumer } from '@/kafka/consumers/base.consumer';
import { logger } from '@/utils/logger.utils';
import { sampleHandlers } from '../handlers/sample.handler';

export class SampleConsumer extends BaseKafkaConsumer {
  private static _instance: SampleConsumer;

  constructor() {
    super(Object.values(KafkaConstants.TOPICS), KafkaConstants.SERVICE_GROUP);
  }

  protected async handleMessage(payload: EachMessagePayload): Promise<void> {
    if (payload.message.value === null) {
      logger.warn(`Received a null message (tombstone) on topic: ${payload.topic}`);
      return;
    }

    const message = JSON.parse(payload.message.value.toString());

    logger.info(message);

    const handler = sampleHandlers[payload.topic];

    if (!handler) {
      logger.warn(`Received message on unknown topic: ${payload.topic}`);
      return;
    }

    await handler(payload);
  }

  /**
   * Public static method to get the singleton instance
   */
  public static get instance(): SampleConsumer {
    if (!SampleConsumer._instance) {
      SampleConsumer._instance = new SampleConsumer();
    }

    return SampleConsumer._instance;
  }
}

export const sampleConsumer = SampleConsumer.instance;
