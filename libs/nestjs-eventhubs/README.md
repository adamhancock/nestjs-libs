# @adamhancock/nestjs-eventhubs

A NestJS module for Azure Event Hubs integration.

## Installation

```bash
npm install @adamhancock/nestjs-eventhubs
# or
yarn add @adamhancock/nestjs-eventhubs
# or
pnpm add @adamhancock/nestjs-eventhubs
```

## Local Development

To use this library locally in another project, you have two options:

### Option 1: Using pnpm link

1. In the library directory:

```bash
cd libs/nestjs-eventhubs
pnpm link --global
```

2. In your project directory:

```bash
pnpm link --global @adamhancock/nestjs-eventhubs
```

### Option 2: Direct path in package.json

Add the library directly to your project's package.json:

```json
{
  "dependencies": {
    "@adamhancock/nestjs-eventhubs": "file:/path/to/nestjs-libs/libs/nestjs-eventhubs"
  }
}
```

Then run:

```bash
pnpm install
```

## Description

This module provides integration between NestJS applications and Azure Event Hubs. It allows you to easily work with Azure Event Hubs in your NestJS applications using decorators for publishing and subscribing to events.

## Configuration

You can configure the module using either static or async configuration:

### Static Configuration

```typescript
import { Module } from '@nestjs/common';
import { EventHubModule } from '@adamhancock/nestjs-eventhubs';

@Module({
  imports: [
    EventHubModule.forRoot({
      connectionString: 'your-eventhubs-connection-string',
      eventHubName: 'your-eventhub-name', // optional if included in connection string
    }),
  ],
})
export class AppModule {}
```

### Async Configuration

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventHubModule } from '@adamhancock/nestjs-eventhubs';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventHubModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connectionString: configService.get('EVENTHUB_CONNECTION_STRING'),
        eventHubName: configService.get('EVENTHUB_NAME'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Usage

### Publishing Events

Use the `@EventHubPublish` decorator to mark methods that should publish their return value to Event Hubs:

```typescript
import { Injectable } from '@nestjs/common';
import { EventHubPublish } from '@adamhancock/nestjs-eventhubs';

@Injectable()
export class UserService {
  @EventHubPublish({
    routingKey: 'user.created',
    partitionKey: 'userId', // optional
    eventHubName: 'users', // optional, overrides the global eventHubName
  })
  async createUser(userData: any) {
    // Your user creation logic
    return {
      userId: 'user123',
      ...userData,
    };
  }
}
```

### Subscribing to Events

Use the `@EventHubSubscribe` decorator to mark methods that should handle incoming events:

```typescript
import { Injectable } from '@nestjs/common';
import { EventHubSubscribe } from '@adamhancock/nestjs-eventhubs';

@Injectable()
export class NotificationService {
  @EventHubSubscribe({
    routingKey: 'user.created',
    consumerGroup: 'notifications', // optional, defaults to '$Default'
    eventHubName: 'users', // optional, overrides the global eventHubName
  })
  async handleUserCreated(eventData: any) {
    // Handle the event
    console.log('New user created:', eventData);
  }
}
```

### Event Types

The module includes TypeScript interfaces for type safety:

```typescript
import { EventData, UserEventData } from '@adamhancock/nestjs-eventhubs';

interface CreateUserEvent extends UserEventData {
  data: {
    userId: string;
    email: string;
  };
}
```

### Decorator Options

Both `@EventHubPublish` and `@EventHubSubscribe` accept the following options:

```typescript
interface EventHubMetadata {
  eventHubName?: string; // Optional, overrides the global eventHubName
  routingKey?: string; // For message routing
  consumerGroup?: string; // For subscribers
  partitionKey?: string; // For publishers
}
```

## Error Handling

The module includes built-in error handling and logging. All errors are logged using NestJS's built-in logger. You can extend the error handling by catching errors in your event handlers:

```typescript
@EventHubSubscribe({ routingKey: 'user.created' })
async handleUserCreated(eventData: any) {
  try {
    await this.processEvent(eventData);
  } catch (error) {
    // Custom error handling
    this.logger.error('Failed to process user creation event', error);
  }
}
```

## Development Status

⚠️ This package is currently under active development. The API is not yet stable and may change without notice.

## License

MIT

## Author

Adam Hancock
