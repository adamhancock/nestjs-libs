import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConnectWisePsaService } from './nestjs-connectwise-psa.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ConnectWisePsaService', () => {
  let service: ConnectWisePsaService;

  const mockOptions = {
    apiUrl: 'https://api.connectwise.com',
    companyId: 'company',
    publicKey: 'public-key',
    privateKey: 'private-key',
    clientId: 'client-id'
  };

  const mockAxiosInstance = {
    request: jest.fn(),
    defaults: {
      baseURL: `${mockOptions.apiUrl}/v4_6_release/apis/3.0`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': expect.any(String),
        'Accept': 'application/json',
        'clientId': mockOptions.clientId
      }
    }
  };

  beforeEach(async () => {
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConnectWisePsaService,
        {
          provide: 'CONNECTWISE_PSA_OPTIONS',
          useValue: mockOptions,
        },
      ],
    }).compile();

    service = module.get<ConnectWisePsaService>(ConnectWisePsaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Authentication', () => {
    it('should create axios instance with correct auth headers', () => {
      const expectedAuth = Buffer.from(
        `${mockOptions.companyId}+${mockOptions.publicKey}:${mockOptions.privateKey}`
      ).toString('base64');

      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: `${mockOptions.apiUrl}/v4_6_release/apis/3.0`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${expectedAuth}`,
          'Accept': 'application/json',
          'clientId': mockOptions.clientId
        }
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle axios errors with response', async () => {
      const mockError = {
        isAxiosError: true,
        response: {
          data: { message: 'API Error' },
          status: HttpStatus.BAD_REQUEST,
          statusText: 'Bad Request',
          headers: {},
          config: {}
        }
      };

      mockAxiosInstance.request.mockRejectedValueOnce(mockError);

      await expect(async () => {
        await service.getTicket(1);
      }).rejects.toThrow(HttpException);
    });

    it('should handle axios errors without response', async () => {
      const mockError = {
        isAxiosError: true,
        message: 'Network Error'
      };

      mockAxiosInstance.request.mockRejectedValueOnce(mockError);

      await expect(async () => {
        await service.getTicket(1);
      }).rejects.toThrow(HttpException);
    });

    it('should handle non-axios errors', async () => {
      const mockError = new Error('Generic Error');
      mockAxiosInstance.request.mockRejectedValueOnce(mockError);

      await expect(async () => {
        await service.getTicket(1);
      }).rejects.toThrow('An unexpected error occurred');
    });
  });

  describe('Tickets', () => {
    const mockTicket = { id: 1, summary: 'Test Ticket' };

    it('should get a ticket by id', async () => {
      mockAxiosInstance.request.mockResolvedValueOnce({ data: mockTicket });
      const result = await service.getTicket(1);
      expect(result).toEqual(mockTicket);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/service/tickets/1'
      });
    });

    it('should get tickets with query options', async () => {
      const mockTickets = [mockTicket];
      const queryOptions = {
        conditions: 'status/name="New"',
        pageSize: 10
      };

      mockAxiosInstance.request.mockResolvedValueOnce({ data: mockTickets });
      const result = await service.getTickets(queryOptions);
      expect(result).toEqual(mockTickets);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/service/tickets',
        params: queryOptions
      });
    });

    it('should get ticket notes', async () => {
      const mockNotes = [{ id: 1, text: 'Test Note' }];
      mockAxiosInstance.request.mockResolvedValueOnce({ data: mockNotes });
      const result = await service.getTicketNotes(1);
      expect(result).toEqual(mockNotes);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/service/tickets/1/notes'
      });
    });
  });

  describe('Configurations', () => {
    const mockConfig = { id: 1, name: 'Test Config' };

    it('should get a configuration by id', async () => {
      mockAxiosInstance.request.mockResolvedValueOnce({ data: mockConfig });
      const result = await service.getConfiguration(1);
      expect(result).toEqual(mockConfig);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/company/configurations/1'
      });
    });

    it('should get configurations with query options', async () => {
      const mockConfigs = [mockConfig];
      mockAxiosInstance.request.mockResolvedValueOnce({ data: mockConfigs });
      const result = await service.getConfigurations();
      expect(result).toEqual(mockConfigs);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/company/configurations'
      });
    });
  });

  describe('Callbacks', () => {
    const mockCallback = { id: 1, description: 'Test Callback' };

    it('should get callbacks', async () => {
      mockAxiosInstance.request.mockResolvedValueOnce({ data: [mockCallback] });
      const result = await service.getCallbacks();
      expect(result).toEqual([mockCallback]);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/system/callbacks'
      });
    });

    it('should create a callback', async () => {
      mockAxiosInstance.request.mockResolvedValueOnce({ data: mockCallback });
      const result = await service.createCallback(mockCallback);
      expect(result).toEqual(mockCallback);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/system/callbacks',
        data: mockCallback
      });
    });

    it('should update a callback', async () => {
      mockAxiosInstance.request.mockResolvedValueOnce({ data: mockCallback });
      const result = await service.updateCallback(1, mockCallback);
      expect(result).toEqual(mockCallback);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'PUT',
        url: '/system/callbacks/1',
        data: mockCallback
      });
    });
  });

  describe('Agreements', () => {
    const mockAgreement = { id: 1, name: 'Test Agreement' };

    it('should get agreements', async () => {
      mockAxiosInstance.request.mockResolvedValueOnce({ data: [mockAgreement] });
      const result = await service.getAgreements();
      expect(result).toEqual([mockAgreement]);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/finance/agreements'
      });
    });

    it('should get agreement types', async () => {
      const mockType = { id: 1, name: 'Test Type' };
      mockAxiosInstance.request.mockResolvedValueOnce({ data: [mockType] });
      const result = await service.getAgreementTypes();
      expect(result).toEqual([mockType]);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/finance/agreements/types'
      });
    });
  });

  describe('Boards', () => {
    const mockBoard = { id: 1, name: 'Test Board' };

    it('should get boards', async () => {
      mockAxiosInstance.request.mockResolvedValueOnce({ data: [mockBoard] });
      const result = await service.getBoards();
      expect(result).toEqual([mockBoard]);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/service/boards'
      });
    });
  });

  describe('Companies', () => {
    const mockCompany = { id: 1, name: 'Test Company' };

    it('should get companies', async () => {
      mockAxiosInstance.request.mockResolvedValueOnce({ data: [mockCompany] });
      const result = await service.getCompanies();
      expect(result).toEqual([mockCompany]);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/company/companies'
      });
    });
  });

  describe('Members', () => {
    const mockMember = { id: 1, name: 'Test Member' };

    it('should get a member by id', async () => {
      mockAxiosInstance.request.mockResolvedValueOnce({ data: mockMember });
      const result = await service.getMember(1);
      expect(result).toEqual(mockMember);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/system/members/1'
      });
    });

    it('should get members', async () => {
      mockAxiosInstance.request.mockResolvedValueOnce({ data: [mockMember] });
      const result = await service.getMembers();
      expect(result).toEqual([mockMember]);
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/system/members'
      });
    });
  });
});
