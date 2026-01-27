import { Kafka, logLevel } from 'kafkajs';
import { CONFIG } from '@/config/config';
import { logger } from '@/utils/logger.utils';

export const kafka = new Kafka({
  clientId: CONFIG.SERVICE_NAME || 'express-service',
  brokers: CONFIG.KAFKA_BROKERS,
  logLevel: logLevel.WARN,
  logCreator: () => ({ label, log }) => {
    logger.debug(`[Kafka][${label}] ${log.message}`);
  },
});
