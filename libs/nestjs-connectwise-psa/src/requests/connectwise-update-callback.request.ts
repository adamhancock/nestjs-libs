import { ConnectwiseRootRequest, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseCallback } from '../types/connectwise-callback.type';

export class ConnectwiseUpdateCallbackRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'PUT';
  path: string;
  responseType!: ConnectwiseCallback;

  constructor(id: number, callback: Partial<ConnectwiseCallback>) {
    super(undefined, callback);
    this.path = `/system/callbacks/${id}`;
  }
}
