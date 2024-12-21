import { ConnectwiseRootRequest, ConnectwiseQueryOptions, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseServiceTicket } from '../types/connectwise-ticket.type';

export class ConnectwiseGetTicketsRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path = '/service/tickets';
  responseType!: ConnectwiseServiceTicket[];

  constructor(params?: ConnectwiseQueryOptions) {
    super(params);
  }
}
