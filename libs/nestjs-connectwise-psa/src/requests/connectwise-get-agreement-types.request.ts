import { ConnectwiseRootRequest, ConnectwiseQueryOptions, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseAgreementType } from '../types/connectwise-agreement-type.type';

export class ConnectwiseGetAgreementTypesRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path = '/finance/agreements/types';
  responseType!: ConnectwiseAgreementType[];

  constructor(params?: ConnectwiseQueryOptions) {
    super(params);
  }
}
