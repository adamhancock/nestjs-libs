import { ConnectwiseRootRequest, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseMember } from '../types/connectwise-member.type';

export class ConnectwiseGetMemberRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path: string;
  responseType!: ConnectwiseMember;

  constructor(id: number) {
    super();
    this.path = `/system/members/${id}`;
  }
}
