import { ConnectwiseRootRequest, ConnectwiseQueryOptions, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseConfiguration } from '../types/connectwise-configuration.type';

export class ConnectwiseGetTicketConfigurationsRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path: string;
  responseType!: ConnectwiseConfiguration[];

  constructor(ticketId: number, params?: ConnectwiseQueryOptions) {
    super(params);
    this.path = `/service/tickets/${ticketId}/configurations`;
  }
}
