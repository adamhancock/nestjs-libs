import { ConnectWisePsaFactory } from './nestjs-connectwise-psa.factory';
import { ConnectWisePsaService } from './nestjs-connectwise-psa.service';

describe('ConnectWisePsaFactory', () => {
  let factory: ConnectWisePsaFactory;

  const mockOptions = {
    apiUrl: 'https://api.connectwise.com',
    companyId: 'company',
    publicKey: 'public-key',
    privateKey: 'private-key',
    clientId: 'client-id',
  };

  beforeEach(async () => {
    factory = new ConnectWisePsaFactory();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(factory).toBeDefined();
  });

  describe('createForTenant', () => {
    it('should create a new service instance for a tenant', () => {
      const service = factory.createForTenant('tenant1', mockOptions);
      expect(service).toBeInstanceOf(ConnectWisePsaService);
    });

    it('should reuse existing service instance for the same tenant', () => {
      const service1 = factory.createForTenant('tenant1', mockOptions);
      const service2 = factory.createForTenant('tenant1', mockOptions);
      expect(service1).toBe(service2);
    });

    it('should create different service instances for different tenants', () => {
      const service1 = factory.createForTenant('tenant1', mockOptions);
      const service2 = factory.createForTenant('tenant2', mockOptions);
      expect(service1).not.toBe(service2);
    });
  });

  describe('getForTenant', () => {
    it('should return undefined for non-existent tenant', () => {
      const service = factory.getForTenant('non-existent');
      expect(service).toBeUndefined();
    });

    it('should return existing service for tenant', () => {
      const createdService = factory.createForTenant('tenant1', mockOptions);
      const retrievedService = factory.getForTenant('tenant1');
      expect(retrievedService).toBe(createdService);
    });
  });

  describe('deleteForTenant', () => {
    it('should return false for non-existent tenant', () => {
      const result = factory.deleteForTenant('non-existent');
      expect(result).toBe(false);
    });

    it('should delete service for existing tenant', () => {
      factory.createForTenant('tenant1', mockOptions);
      const result = factory.deleteForTenant('tenant1');
      expect(result).toBe(true);
      expect(factory.getForTenant('tenant1')).toBeUndefined();
    });
  });
});
