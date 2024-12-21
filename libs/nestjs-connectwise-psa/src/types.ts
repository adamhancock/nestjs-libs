import { Type } from '@nestjs/common';

export interface ConnectWisePsaOptions {
  /**
   * ConnectWise PSA API URL
   */
  apiUrl: string;

  /**
   * Company ID
   */
  companyId: string;

  /**
   * Public API Key
   */
  publicKey: string;

  /**
   * Private API Key
   */
  privateKey: string;

  /**
   * Client ID
   */
  clientId: string;
}

export interface ConnectWisePsaOptionsFactory {
  createConnectWisePsaOptions():
    | Promise<ConnectWisePsaOptions>
    | ConnectWisePsaOptions;
}

export interface ConnectWisePsaAsyncOptions {
  imports?: any[];
  useExisting?: Type<ConnectWisePsaOptionsFactory>;
  useClass?: Type<ConnectWisePsaOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ConnectWisePsaOptions> | ConnectWisePsaOptions;
  inject?: any[];
}
