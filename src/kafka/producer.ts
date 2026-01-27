import type { Message, Producer } from 'kafkajs';
import { InternalServerError } from '@/exceptions';
import { kafka } from '@/kafka/client';
import { logger } from '@/utils/logger.utils';

class KafkaProducer {
  private static _instance: KafkaProducer;
  private producer: Producer;
  private isConnected = false;

  private constructor() {
    this.producer = kafka.producer({ allowAutoTopicCreation: true });
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      logger.info(`[Kafka] A producer is already connected!`);
      return;
    };

    try {
      await this.producer.connect();
      this.isConnected = true;
      logger.info('Kafka Producer connected.');
    } catch (error) {
      logger.error(`[Kafka] Failed to connect producer: ${error}`);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      logger.info(`[Kafka] No producer to disconnect!`);
      return;
    }

    try {
      await this.producer.disconnect();
      this.isConnected = false;
      logger.info('Kafka producer disconnected.');
    } catch (error) {
      logger.error(`[Kafka] Failed to disconnect producer: ${error}`);
    }
  }

  /**
   * Send a single message
   */
  public async send(topic: string, key: string, value: object): Promise<void> {
    this.isProducerConnected();

    const message: Message = {
      key,
      value: JSON.stringify(value),
    };

    await this.producer.send({
      topic,
      messages: [message],
    });

    logger.debug(`[Kafka] Sent message to ${topic}: ${JSON.stringify(value)}`);
  }

  /**
   * Send multiple messages in batch
   */
  public async sendBatch(topic: string, messages: Array<{ key: string; value: object }>): Promise<void> {
    this.isProducerConnected();

    const formattedMessages: Message[] = messages.map(({ key, value }) => ({
      key,
      value: JSON.stringify(value),
    }));

    await this.producer.send({
      topic,
      messages: formattedMessages,
    });

    logger.debug(`[Kafka] Sent batch of ${messages.length} messages to ${topic}`);
  }

  private isProducerConnected(): boolean {
    if (this.isConnected) return true;

    throw new InternalServerError(`Producer is not connected or the lost connection. Please connect producer first.`);
  }

  /**
   * Static method to ensure only 1 instance is returned every time
   */
  public static get instance(): KafkaProducer {
    if (!KafkaProducer._instance) {
      KafkaProducer._instance = new KafkaProducer();
    }
    return KafkaProducer._instance;
  }
}

export const kafkaProducer = KafkaProducer.instance;
