import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConnectWisePsaService } from './nestjs-connectwise-psa.service';
import {
  ConnectWisePsaOptions,
  ConnectWisePsaOptionsFactory,
  ConnectWisePsaAsyncOptions,
} from './types';
import { CONNECTWISE_PSA_OPTIONS } from './constants';

@Module({
  providers: [ConnectWisePsaService],
  exports: [ConnectWisePsaService],
})
export class ConnectWisePsaModule {
  static register(options: ConnectWisePsaOptions): DynamicModule {
    return {
      module: ConnectWisePsaModule,
      providers: [
        {
          provide: CONNECTWISE_PSA_OPTIONS,
          useValue: options,
        },
        ConnectWisePsaService,
      ],
    };
  }

  static registerAsync(options: ConnectWisePsaAsyncOptions): DynamicModule {
    return {
      module: ConnectWisePsaModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options), ConnectWisePsaService],
    };
  }

  private static createAsyncProviders(
    options: ConnectWisePsaAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    if (options.useExisting) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: ConnectWisePsaAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: CONNECTWISE_PSA_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: CONNECTWISE_PSA_OPTIONS,
      useFactory: async (optionsFactory: ConnectWisePsaOptionsFactory) =>
        await optionsFactory.createConnectWisePsaOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
