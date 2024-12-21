export interface ConnectwiseCallback {
  id: number;
  url: string;
  objectId: number;
  type: string;
  level: string;
  description: string;
  memberId: number;
  payloadVersion: string;
  inactiveFlag: boolean;
  isSoapCallbackFlag: boolean;
  isSelfSuppressedFlag: boolean;
  connectWiseID: string;
  _info: {
    lastUpdated: string;
    updatedBy: string;
  };
}

export interface ConnectwiseCreateCallback {
  description: string;
  url: string;
  objectId: number;
  type: string;
  level: string;
  memberId: number;
  inactiveFlag?: boolean;
}
