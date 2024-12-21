import { ConnectwiseRootRequest, ConnectwiseQueryOptions, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseMember } from '../types/connectwise-member.type';

export class ConnectwiseGetMembersRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path = '/system/members';
  responseType!: ConnectwiseMember[];

  constructor(params?: ConnectwiseQueryOptions) {
    super(params);
  }
}
