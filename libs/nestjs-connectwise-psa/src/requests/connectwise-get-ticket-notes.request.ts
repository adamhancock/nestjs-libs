import { ConnectwiseRootRequest, ConnectwiseQueryOptions, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseTicketNote } from '../types/connectwise-ticket-note.type';

export class ConnectwiseGetTicketNotesRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path: string;
  responseType!: ConnectwiseTicketNote[];

  constructor(ticketId: number, params?: ConnectwiseQueryOptions) {
    super(params);
    this.path = `/service/tickets/${ticketId}/notes`;
  }
}
