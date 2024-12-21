import { ConnectwiseRootRequest, ConnectwiseQueryOptions, HTTP_METHOD } from './connectwise-root.request';
import { ConnectwiseBoard } from '../types/connectwise-board.type';

export class ConnectwiseGetBoardsRequest extends ConnectwiseRootRequest {
  method: HTTP_METHOD = 'GET';
  path = '/service/boards';
  responseType!: ConnectwiseBoard[];

  constructor(params?: ConnectwiseQueryOptions) {
    super(params);
  }
}
