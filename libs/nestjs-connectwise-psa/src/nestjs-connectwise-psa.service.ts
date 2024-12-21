import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConnectWisePsaOptions } from './types';
import axios, { AxiosInstance } from 'axios';
import { ConnectwiseQueryOptions } from './requests/connectwise-root.request';
import {
  ConnectwiseServiceTicket,
  ConnectwiseConfiguration,
  ConnectwiseCallback,
  ConnectwiseAgreement,
  ConnectwiseAgreementType,
  ConnectwiseBoard,
  ConnectwiseCompany,
  ConnectwiseMember,
  ConnectwiseTicketNote
} from './types/index';
import { ConnectwiseGetTicketRequest } from './requests/connectwise-get-ticket.request';
import { ConnectwiseGetTicketsRequest } from './requests/connectwise-get-tickets.request';
import { ConnectwiseGetTicketNotesRequest } from './requests/connectwise-get-ticket-notes.request';
import { ConnectwiseGetConfigurationRequest } from './requests/connectwise-get-configuration.request';
import { ConnectwiseGetConfigurationsRequest } from './requests/connectwise-get-configurations.request';
import { ConnectwiseGetCallbacksRequest } from './requests/connectwise-get-callbacks.request';
import { ConnectwiseCreateCallbackRequest } from './requests/connectwise-create-callback.request';
import { ConnectwiseUpdateCallbackRequest } from './requests/connectwise-update-callback.request';
import { ConnectwiseGetAgreementsRequest } from './requests/connectwise-get-agreements.request';
import { ConnectwiseGetAgreementTypesRequest } from './requests/connectwise-get-agreement-types.request';
import { ConnectwiseGetBoardsRequest } from './requests/connectwise-get-boards.request';
import { ConnectwiseGetCompaniesRequest } from './requests/connectwise-get-companies.request';
import { ConnectwiseGetMemberRequest } from './requests/connectwise-get-member.request';
import { ConnectwiseGetMembersRequest } from './requests/connectwise-get-members.request';
import { ConnectwiseGetTicketConfigurationsRequest } from './requests/connectwise-get-ticket-configurations.request';

@Injectable()
export class ConnectWisePsaService {
  private readonly axiosInstance: AxiosInstance;
  private readonly basePath = '/v4_6_release/apis/3.0';

  constructor(
    @Inject('CONNECTWISE_PSA_OPTIONS')
    private readonly options: ConnectWisePsaOptions
  ) {
    const auth = Buffer.from(
      `${options.companyId}+${options.publicKey}:${options.privateKey}`
    ).toString('base64');

    this.axiosInstance = axios.create({
      baseURL: `${options.apiUrl}${this.basePath}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'clientId': options.clientId
      }
    });
  }

  private async request<T>(request: { getRequestConfig: () => any }): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>(request.getRequestConfig());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.response?.data?.message || error.message || 'ConnectWise PSA API Error';
        throw new HttpException(message, status);
      }
      throw new HttpException('An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Tickets
  async getTicket(id: number): Promise<ConnectwiseServiceTicket> {
    const request = new ConnectwiseGetTicketRequest(id);
    return this.request<ConnectwiseServiceTicket>(request);
  }

  async getTickets(options?: ConnectwiseQueryOptions): Promise<ConnectwiseServiceTicket[]> {
    const request = new ConnectwiseGetTicketsRequest(options);
    return this.request<ConnectwiseServiceTicket[]>(request);
  }

  async getTicketConfigurations(ticketId: number, options?: ConnectwiseQueryOptions): Promise<ConnectwiseConfiguration[]> {
    const request = new ConnectwiseGetTicketConfigurationsRequest(ticketId, options);
    return this.request<ConnectwiseConfiguration[]>(request);
  }

  async getTicketNotes(ticketId: number): Promise<ConnectwiseTicketNote[]> {
    const request = new ConnectwiseGetTicketNotesRequest(ticketId);
    return this.request<ConnectwiseTicketNote[]>(request);
  }

  // Configurations
  async getConfiguration(id: number): Promise<ConnectwiseConfiguration> {
    const request = new ConnectwiseGetConfigurationRequest(id);
    return this.request<ConnectwiseConfiguration>(request);
  }

  async getConfigurations(options?: ConnectwiseQueryOptions): Promise<ConnectwiseConfiguration[]> {
    const request = new ConnectwiseGetConfigurationsRequest(options);
    return this.request<ConnectwiseConfiguration[]>(request);
  }

  // Callbacks
  async getCallbacks(options?: ConnectwiseQueryOptions): Promise<ConnectwiseCallback[]> {
    const request = new ConnectwiseGetCallbacksRequest(options);
    return this.request<ConnectwiseCallback[]>(request);
  }

  async createCallback(callback: Partial<ConnectwiseCallback>): Promise<ConnectwiseCallback> {
    const request = new ConnectwiseCreateCallbackRequest(callback);
    return this.request<ConnectwiseCallback>(request);
  }

  async updateCallback(id: number, callback: Partial<ConnectwiseCallback>): Promise<ConnectwiseCallback> {
    const request = new ConnectwiseUpdateCallbackRequest(id, callback);
    return this.request<ConnectwiseCallback>(request);
  }

  // Agreements
  async getAgreements(options?: ConnectwiseQueryOptions): Promise<ConnectwiseAgreement[]> {
    const request = new ConnectwiseGetAgreementsRequest(options);
    return this.request<ConnectwiseAgreement[]>(request);
  }

  async getAgreementTypes(options?: ConnectwiseQueryOptions): Promise<ConnectwiseAgreementType[]> {
    const request = new ConnectwiseGetAgreementTypesRequest(options);
    return this.request<ConnectwiseAgreementType[]>(request);
  }

  // Boards
  async getBoards(options?: ConnectwiseQueryOptions): Promise<ConnectwiseBoard[]> {
    const request = new ConnectwiseGetBoardsRequest(options);
    return this.request<ConnectwiseBoard[]>(request);
  }

  // Companies
  async getCompanies(options?: ConnectwiseQueryOptions): Promise<ConnectwiseCompany[]> {
    const request = new ConnectwiseGetCompaniesRequest(options);
    return this.request<ConnectwiseCompany[]>(request);
  }

  // Members
  async getMember(id: number): Promise<ConnectwiseMember> {
    const request = new ConnectwiseGetMemberRequest(id);
    return this.request<ConnectwiseMember>(request);
  }

  async getMembers(options?: ConnectwiseQueryOptions): Promise<ConnectwiseMember[]> {
    const request = new ConnectwiseGetMembersRequest(options);
    return this.request<ConnectwiseMember[]>(request);
  }
}
