import { ConnectwiseRootRequest, ConnectwiseQueryOptions, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseCallback } from '../types/connectwise-callback.type';

export class ConnectwiseGetCallbacksRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path = '/system/callbacks';
  responseType!: ConnectwiseCallback[];

  constructor(params?: ConnectwiseQueryOptions) {
    super(params);
  }
}
