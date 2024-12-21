import { ConnectwiseRootRequest, ConnectwiseQueryOptions, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseCompany } from '../types/connectwise-company.type';

export class ConnectwiseGetCompaniesRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path = '/company/companies';
  responseType!: ConnectwiseCompany[];

  constructor(params?: ConnectwiseQueryOptions) {
    super(params);
  }
}
