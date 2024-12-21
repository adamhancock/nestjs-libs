import { ConnectwiseRootRequest, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseCallback } from '../types/connectwise-callback.type';

export class ConnectwiseCreateCallbackRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'POST';
  path = '/system/callbacks';
  responseType!: ConnectwiseCallback;

  constructor(callback: Partial<ConnectwiseCallback>) {
    super(undefined, callback);
  }
}
