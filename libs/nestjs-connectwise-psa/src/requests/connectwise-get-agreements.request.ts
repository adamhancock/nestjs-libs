import { ConnectwiseRootRequest, ConnectwiseQueryOptions, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseAgreement } from '../types/connectwise-agreement.type';

export class ConnectwiseGetAgreementsRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path = '/finance/agreements';
  responseType!: ConnectwiseAgreement[];

  constructor(params?: ConnectwiseQueryOptions) {
    super(params);
  }
}
