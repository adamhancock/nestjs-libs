import { Injectable } from '@nestjs/common';
import { ConnectWisePsaService } from './nestjs-connectwise-psa.service';
import { ConnectWisePsaOptions } from './types';

@Injectable()
export class ConnectWisePsaFactory {
  private services = new Map<string, ConnectWisePsaService>();

  createForTenant(
    tenantId: string,
    options: ConnectWisePsaOptions,
  ): ConnectWisePsaService {
    if (!this.services.has(tenantId)) {
      const service = new ConnectWisePsaService(options);
      this.services.set(tenantId, service);
    }
    return this.services.get(tenantId)!;
  }

  getForTenant(tenantId: string): ConnectWisePsaService | undefined {
    return this.services.get(tenantId);
  }

  deleteForTenant(tenantId: string): boolean {
    return this.services.delete(tenantId);
  }
}
