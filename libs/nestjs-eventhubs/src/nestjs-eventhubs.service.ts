import { Injectable, Logger, OnModuleDestroy, OnModuleInit, Inject } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import {
  EventHubProducerClient,
  EventHubConsumerClient,
  SubscriptionEventHandlers,
  ReceivedEventData,
  EventData as AzureEventData,
} from '@azure/event-hubs';
import { EVENT_HUB_PUBLISH, EVENT_HUB_SUBSCRIBE, EventHubMetadata } from './decorators';
import { EventData, EventHubOptions } from './types';

interface ConnectionDetails {
  connectionString: string;
  eventHubName?: string;
}

@Injectable()
export class EventHubService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(EventHubService.name);
  private producers: Map<string, EventHubProducerClient> = new Map();
  private consumers: Map<string, EventHubConsumerClient> = new Map();
  private subscriptions: Map<string, { close: () => Promise<void> }> = new Map();
  private subscribers: Map<string, { instance: any; methodName: string; metadata: EventHubMetadata }[]> = new Map();

  constructor(
    private readonly discovery: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    @Inject('EVENTHUBS_OPTIONS') private readonly options: EventHubOptions,
  ) { }

  async onModuleInit() {
    await this.setupEventHandlers();
    await this.startSubscriptions();
  }

  async onModuleDestroy() {
    // Close all subscriptions
    for (const subscription of this.subscriptions.values()) {
      await subscription.close();
    }

    // Close all producers
    for (const producer of this.producers.values()) {
      await producer.close();
    }

    // Close all consumers
    for (const consumer of this.consumers.values()) {
      await consumer.close();
    }
  }

  private getConnectionDetails(metadata?: EventHubMetadata): ConnectionDetails {
    return {
      connectionString: this.options.connectionString,
      eventHubName: metadata?.eventHubName || this.options.eventHubName,
    };
  }

  private async getProducer(metadata?: EventHubMetadata): Promise<EventHubProducerClient> {
    const { connectionString, eventHubName } = this.getConnectionDetails(metadata);
    const key = `${eventHubName || 'default'}`;

    if (!this.producers.has(key)) {
      try {
        const producer = new EventHubProducerClient(connectionString, eventHubName);
        await producer.getPartitionIds(); // Test connection
        this.producers.set(key, producer);
        this.logger.log(`Connected to Event Hub ${eventHubName || '(default)'}`);
      } catch (error) {
        this.logger.error('Failed to connect to Event Hub:', error);
        throw error;
      }
    }
    return this.producers.get(key);
  }

  private async getConsumer(metadata?: EventHubMetadata): Promise<EventHubConsumerClient> {
    const { connectionString, eventHubName } = this.getConnectionDetails(metadata);
    const consumerGroup = metadata?.consumerGroup || '$Default';
    const key = `${eventHubName || 'default'}-${consumerGroup}`;

    if (!this.consumers.has(key)) {
      const consumer = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName);
      this.consumers.set(key, consumer);
    }
    return this.consumers.get(key);
  }

  private async setupEventHandlers() {
    const providers = this.discovery.getProviders()
      .filter(wrapper => wrapper.instance);

    for (const wrapper of providers) {
      const { instance } = wrapper;
      const prototype = Object.getPrototypeOf(instance);

      this.metadataScanner.scanFromPrototype(
        instance,
        prototype,
        async (methodName: string) => {
          const methodRef = prototype[methodName];
          const subscribeMetadata = Reflect.getMetadata(EVENT_HUB_SUBSCRIBE, methodRef);
          const publishMetadata = Reflect.getMetadata(EVENT_HUB_PUBLISH, methodRef);

          if (subscribeMetadata) {
            await this.registerSubscriber(instance, methodName, subscribeMetadata);
          }

          if (publishMetadata) {
            await this.setupPublisher(instance, methodName, publishMetadata);
          }
        },
      );
    }
  }

  private async registerSubscriber(instance: any, methodName: string, metadata: EventHubMetadata) {
    const key = `${metadata.eventHubName || 'default'}-${metadata.consumerGroup || '$Default'}`;

    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, []);
    }

    this.subscribers.get(key).push({ instance, methodName, metadata });
    this.logger.log(`Registered subscriber ${instance.constructor.name}.${methodName}`);
  }

  private async startSubscriptions() {
    for (const [key, subscribers] of this.subscribers.entries()) {
      if (subscribers.length === 0) continue;

      const consumer = await this.getConsumer(subscribers[0].metadata);

      const subscription = await consumer.subscribe({
        processEvents: async (events: ReceivedEventData[], context: any) => {
          for (const event of events) {
            for (const { instance, methodName, metadata } of subscribers) {
              try {
                if (this.shouldProcessEvent(event, metadata.routingKey)) {
                  await instance[methodName](event.body);
                }
              } catch (error) {
                this.logger.error(
                  `Error processing event in ${instance.constructor.name}.${methodName}: ${error}`
                );
              }
            }
            await context.updateCheckpoint(event);
          }
        },
        processError: async (error: Error) => {
          this.logger.error('Error processing events:', error);
        },
      } satisfies SubscriptionEventHandlers);

      this.subscriptions.set(key, subscription);
      this.logger.log(`Started subscription for ${key}`);
    }
  }

  private shouldProcessEvent(event: ReceivedEventData, routingKey?: string): boolean {
    if (!routingKey) return true;
    return event.properties?.routingKey === routingKey;
  }

  private async setupPublisher(instance: any, methodName: string, metadata: EventHubMetadata) {
    const originalMethod = instance[methodName];
    const self = this;

    instance[methodName] = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      try {
        const producer = await self.getProducer(metadata);
        const eventData: AzureEventData = {
          body: result,
          properties: {
            routingKey: metadata.routingKey,
            timestamp: new Date().toISOString(),
          },
        };

        if (metadata.partitionKey) {
          await producer.sendBatch([eventData], { partitionKey: metadata.partitionKey });
        } else {
          await producer.sendBatch([eventData]);
        }

        self.logger.log(`Published message from ${instance.constructor.name}.${methodName}`);
      } catch (error) {
        self.logger.error('Error publishing message:', error);
        throw error;
      }

      return result;
    };

    this.logger.log(`Setup publisher for ${instance.constructor.name}.${methodName}`);
  }
}
