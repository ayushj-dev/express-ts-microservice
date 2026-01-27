import { KafkaConstants } from '@/constants/kafka.constants';
import { SampleService } from '@/services/sample.service';
import type { Kafkahandler } from '@/types/kafka/kafta.types';
import { logger } from '@/utils/logger.utils';

export const sampleCreated = async (payload: any) => {
  try {
    logger.info(`[Kafka] user.created: ${JSON.stringify(payload)}`);
    const result = new SampleService().create(); // Business logic
    logger.info(result);
  } catch (error) {
    logger.error(`[Kafka] Error handling user.created: ${error}`);
    // optionally retry / move to dead-letter topic
  }
};

export const sampleUpdated = async (payload: any) => {
  try {
    logger.info(`[Kafka] user.created: ${JSON.stringify(payload)}`);
    const result = new SampleService().update(); // Business logic
    logger.info(result);
  } catch (error) {
    logger.error(`[Kafka] Error handling user.created: ${error}`);
    // optionally retry / move to dead-letter topic
  }
};

export const sampleDeleted = async (payload: any) => {
  try {
    logger.info(`[Kafka] user.created: ${JSON.stringify(payload)}`);
    const result = new SampleService().delete(); // Business logic
    logger.info(result);
  } catch (error) {
    logger.error(`[Kafka] Error handling user.created: ${error}`);
    // optionally retry / move to dead-letter topic
  }
};

export const sampleHandlers: Kafkahandler = {
  [KafkaConstants.TOPICS.SAMPLE_CREATED]: sampleCreated,
  [KafkaConstants.TOPICS.SAMPLE_UPDATED]: sampleUpdated,
  [KafkaConstants.TOPICS.SAMPLE_DELETED]: sampleDeleted
};
