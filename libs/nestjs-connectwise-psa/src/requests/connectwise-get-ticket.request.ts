import { ConnectwiseRootRequest, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseServiceTicket } from '../types/connectwise-ticket.type';

export class ConnectwiseGetTicketRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path: string;
  responseType!: ConnectwiseServiceTicket;

  constructor(id: number) {
    super();
    this.path = `/service/tickets/${id}`;
  }
}
