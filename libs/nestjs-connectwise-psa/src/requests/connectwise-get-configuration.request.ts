import { ConnectwiseRootRequest, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseConfiguration } from '../types/connectwise-configuration.type';

export class ConnectwiseGetConfigurationRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path: string;
  responseType!: ConnectwiseConfiguration;

  constructor(id: number) {
    super();
    this.path = `/company/configurations/${id}`;
  }
}
