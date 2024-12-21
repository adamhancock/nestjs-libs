# @adamhancock/nestjs-connectwise-psa

A NestJS module for ConnectWise PSA (Professional Services Automation) integration.

## Installation

```bash
pnpm add @adamhancock/nestjs-connectwise-psa
```

## Local Development

To use this library locally in another project, you have two options:

### Option 1: Using pnpm link

1. In the library directory:

```bash
cd libs/nestjs-connectwise-psa
pnpm link --global
```

2. In your project directory:

```bash
pnpm link --global @adamhancock/nestjs-connectwise-psa
```

### Option 2: Direct path in package.json

Add the library directly to your project's package.json:

```json
{
  "dependencies": {
    "@adamhancock/nestjs-connectwise-psa": "file:/path/to/nestjs-libs/libs/nestjs-connectwise-psa"
  }
}
```

Then run:

```bash
pnpm install
```

## Description

This module provides integration between NestJS applications and ConnectWise PSA. It offers a comprehensive set of features for interacting with the ConnectWise PSA API, including ticket management, configurations, callbacks, agreements, boards, companies, and members.

## Configuration

You can configure the module using either static or async configuration:

### Static Configuration

```typescript
import { Module } from '@nestjs/common';
import { ConnectWisePsaModule } from '@adamhancock/nestjs-connectwise-psa';

@Module({
  imports: [
    ConnectWisePsaModule.forRoot({
      apiUrl: 'https://api-na.myconnectwise.net',
      companyId: 'your-company-id',
      publicKey: 'your-public-key',
      privateKey: 'your-private-key',
      clientId: 'your-client-id',
    }),
  ],
})
export class AppModule {}
```

### Async Configuration

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectWisePsaModule } from '@adamhancock/nestjs-connectwise-psa';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConnectWisePsaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        apiUrl: configService.get('CONNECTWISE_API_URL'),
        companyId: configService.get('CONNECTWISE_COMPANY_ID'),
        publicKey: configService.get('CONNECTWISE_PUBLIC_KEY'),
        privateKey: configService.get('CONNECTWISE_PRIVATE_KEY'),
        clientId: configService.get('CONNECTWISE_CLIENT_ID'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Usage

### Single-Tenant Usage

For single-tenant applications, inject the ConnectWisePsaService directly:

```typescript
import { Injectable } from '@nestjs/common';
import { ConnectWisePsaService } from '@adamhancock/nestjs-connectwise-psa';

@Injectable()
export class TicketService {
  constructor(private readonly connectWiseService: ConnectWisePsaService) {}

  async getTicket(id: number) {
    return this.connectWiseService.getTicket(id);
  }
}
```

### Multi-Tenant Usage

For multi-tenant applications, use the ConnectWisePsaFactory to manage separate service instances for each tenant:

```typescript
import { Injectable } from '@nestjs/common';
import { ConnectWisePsaFactory } from '@adamhancock/nestjs-connectwise-psa';

@Injectable()
export class MultiTenantTicketService {
  constructor(private readonly connectWiseFactory: ConnectWisePsaFactory) {}

  async getTicket(tenantId: string, ticketId: number) {
    // Get or create a service instance for this tenant
    const service = this.connectWiseFactory.createForTenant(tenantId, {
      apiUrl: `https://api-${tenantId}.myconnectwise.net`,
      companyId: `company-${tenantId}`,
      publicKey: 'tenant-specific-public-key',
      privateKey: 'tenant-specific-private-key',
      clientId: `client-${tenantId}`,
    });

    return service.getTicket(ticketId);
  }

  // Example of tenant cleanup
  async removeTenant(tenantId: string) {
    this.connectWiseFactory.deleteForTenant(tenantId);
  }
}
```

### Factory Methods

The ConnectWisePsaFactory provides the following methods:

```typescript
// Create or get an existing service instance for a tenant
const service = factory.createForTenant(tenantId, options);

// Get an existing service instance (returns undefined if not found)
const service = factory.getForTenant(tenantId);

// Remove a tenant's service instance
const removed = factory.deleteForTenant(tenantId);
```

### Available Methods

#### Tickets

```typescript
// Get a single ticket
const ticket = await service.getTicket(123);

// Get multiple tickets with query options
const tickets = await service.getTickets({
  conditions: 'status/name="New"',
  pageSize: 10,
});

// Get ticket notes
const notes = await service.getTicketNotes(123);
```

#### Configurations

```typescript
// Get a configuration
const config = await service.getConfiguration(123);

// Get multiple configurations
const configs = await service.getConfigurations();
```

#### Callbacks

```typescript
// Get callbacks
const callbacks = await service.getCallbacks();

// Create a callback
const newCallback = await service.createCallback({
  description: 'New Callback',
});

// Update a callback
const updatedCallback = await service.updateCallback(123, {
  description: 'Updated Callback',
});
```

#### Agreements

```typescript
// Get agreements
const agreements = await service.getAgreements();

// Get agreement types
const types = await service.getAgreementTypes();
```

#### Boards

```typescript
// Get boards
const boards = await service.getBoards();
```

#### Companies

```typescript
// Get companies
const companies = await service.getCompanies();
```

#### Members

```typescript
// Get a single member
const member = await service.getMember(123);

// Get multiple members
const members = await service.getMembers();
```

### Query Options

Most methods that return collections support query options:

```typescript
interface ConnectwiseQueryOptions {
  conditions?: string;
  childConditions?: string;
  customFieldConditions?: string;
  orderBy?: string;
  fields?: string[];
  page?: number;
  pageSize?: number;
}
```

Example usage:

```typescript
const tickets = await service.getTickets({
  conditions: 'status/name="New"',
  orderBy: 'dateEntered desc',
  pageSize: 25,
  fields: ['id', 'summary', 'status'],
});
```

### Error Handling

The service automatically handles ConnectWise API errors and converts them to NestJS HttpExceptions:

```typescript
try {
  const ticket = await service.getTicket(123);
} catch (error) {
  if (error instanceof HttpException) {
    // Handle API error
    console.error('API Error:', error.message);
    console.error('Status:', error.getStatus());
  } else {
    // Handle other errors
    console.error('Error:', error);
  }
}
```

## Development Status

⚠️ This package is currently under active development. The API is not yet stable and may change without notice.

## License

MIT

## Author

Adam Hancock
