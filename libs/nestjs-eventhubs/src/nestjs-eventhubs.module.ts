import { DynamicModule, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { EventHubService } from './nestjs-eventhubs.service';
import { EventHubOptions, EventHubAsyncOptions } from './types';

@Module({})
export class EventHubModule {
  static forRoot(options: EventHubOptions): DynamicModule {
    return {
      module: EventHubModule,
      imports: [DiscoveryModule],
      providers: [
        {
          provide: 'EVENTHUBS_OPTIONS',
          useValue: options,
        },
        EventHubService,
      ],
      exports: [EventHubService],
    };
  }

  static forRootAsync(options: EventHubAsyncOptions): DynamicModule {
    return {
      module: EventHubModule,
      imports: [DiscoveryModule, ...(options.imports || [])],
      providers: [
        {
          provide: 'EVENTHUBS_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        EventHubService,
      ],
      exports: [EventHubService],
    };
  }
}
