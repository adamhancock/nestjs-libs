import { ConnectwiseRootRequest, ConnectwiseQueryOptions, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseConfiguration } from '../types/connectwise-configuration.type';

export class ConnectwiseGetConfigurationsRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path = '/company/configurations';
  responseType!: ConnectwiseConfiguration[];

  constructor(params?: ConnectwiseQueryOptions) {
    super(params);
  }
}
