import 'reflect-metadata';

export const EVENT_HUB_PUBLISH = Symbol('event_hub_publish');
export const EVENT_HUB_SUBSCRIBE = Symbol('event_hub_subscribe');

export interface EventHubMetadata {
  eventHubName?: string;  // Optional if using connection string with EntityPath
  routingKey?: string;    // For message routing
  consumerGroup?: string; // For subscribers
  partitionKey?: string;  // For publishers
  methodName: string;
  target: any;
}

export const EventHub = (options: Omit<EventHubMetadata, 'methodName' | 'target'> = {}): MethodDecorator => {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const metadata: EventHubMetadata = {
      ...options,
      methodName: propertyKey.toString(),
      target
    };
    Reflect.defineMetadata(EVENT_HUB_PUBLISH, metadata, descriptor.value);
    return descriptor;
  };
};

export const EventHubPublish = (options: Omit<EventHubMetadata, 'methodName' | 'target'> = {}): MethodDecorator => {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const metadata: EventHubMetadata = {
      ...options,
      methodName: propertyKey.toString(),
      target
    };
    Reflect.defineMetadata(EVENT_HUB_PUBLISH, metadata, descriptor.value);
    return descriptor;
  };
};

export const EventHubSubscribe = (options: Omit<EventHubMetadata, 'methodName' | 'target'> = {}): MethodDecorator => {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const metadata: EventHubMetadata = {
      ...options,
      methodName: propertyKey.toString(),
      target
    };
    Reflect.defineMetadata(EVENT_HUB_SUBSCRIBE, metadata, descriptor.value);
    return descriptor;
  };
};
