import { Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConnectWisePsaModule } from './nestjs-connectwise-psa.module';
import { ConnectWisePsaService } from './nestjs-connectwise-psa.service';
import { ConnectWisePsaOptions, ConnectWisePsaOptionsFactory } from './types';

describe('ConnectWisePsaModule', () => {
  const mockOptions: ConnectWisePsaOptions = {
    apiUrl: 'https://api.connectwise.com',
    companyId: 'company',
    publicKey: 'public-key',
    privateKey: 'private-key',
    clientId: 'client-id',
  };

  it('should register module with options', async () => {
    const module = await Test.createTestingModule({
      imports: [ConnectWisePsaModule.register(mockOptions)],
    }).compile();

    const service = module.get<ConnectWisePsaService>(ConnectWisePsaService);
    expect(service).toBeDefined();
  });

  it('should register async module with useFactory', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConnectWisePsaModule.registerAsync({
          useFactory: () => mockOptions,
        }),
      ],
    }).compile();

    const service = module.get<ConnectWisePsaService>(ConnectWisePsaService);
    expect(service).toBeDefined();
  });

  it('should register async module with useClass', async () => {
    class ConfigService implements ConnectWisePsaOptionsFactory {
      createConnectWisePsaOptions(): ConnectWisePsaOptions {
        return mockOptions;
      }
    }

    const module = await Test.createTestingModule({
      imports: [
        ConnectWisePsaModule.registerAsync({
          useClass: ConfigService,
        }),
      ],
    }).compile();

    const service = module.get<ConnectWisePsaService>(ConnectWisePsaService);
    expect(service).toBeDefined();
  });

  it('should register async module with useExisting', async () => {
    class ConfigService implements ConnectWisePsaOptionsFactory {
      createConnectWisePsaOptions(): ConnectWisePsaOptions {
        return mockOptions;
      }
    }

    @Module({
      providers: [ConfigService],
      exports: [ConfigService],
    })
    class ConfigModule {}

    const module = await Test.createTestingModule({
      imports: [
        ConfigModule,
        ConnectWisePsaModule.registerAsync({
          imports: [ConfigModule],
          useExisting: ConfigService,
        }),
      ],
    }).compile();

    const service = module.get<ConnectWisePsaService>(ConnectWisePsaService);
    expect(service).toBeDefined();
  });
});
