import { Test, TestingModule } from '@nestjs/testing';
import { EventHubService } from './nestjs-eventhubs.service';
import { ConfigService } from '@nestjs/config';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';

describe('EventHubService', () => {
  let service: EventHubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventHubService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mock-value'),
          },
        },
        {
          provide: DiscoveryService,
          useValue: {
            getProviders: jest.fn().mockReturnValue([]),
          },
        },
        {
          provide: MetadataScanner,
          useValue: {
            scanFromPrototype: jest.fn(),
          },
        },
        {
          provide: 'EVENTHUBS_OPTIONS',
          useValue: {
            connectionString: 'mock-connection-string',
            eventHubName: 'test-hub',
          },
        },
      ],
    }).compile();

    service = module.get<EventHubService>(EventHubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
