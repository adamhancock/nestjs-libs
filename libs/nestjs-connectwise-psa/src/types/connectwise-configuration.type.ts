export type ConnectwiseConfiguration = {
  id: number;
  name: string;
  type: {
    id: number;
    name: string;
    _info: {
      type_href: string;
    };
  };
  status: {
    id: number;
    name: string;
    _info: {
      status_href: string;
    };
  };
  company: {
    id: number;
    identifier: string;
    name: string;
    _info: {
      company_href: string;
    };
  };
  contact: {
    id: number;
    name: string;
    _info: {
      contact_href: string;
    };
  };
  site: {
    id: number;
    name: string;
    _info: {
      site_href: string;
    };
  };
  locationId: number;
  location: {
    id: number;
    name: string;
    _info: {
      location_href: string;
    };
  };
  businessUnitId: number;
  department: {
    id: number;
    identifier: string;
    name: string;
    _info: {
      department_href: string;
    };
  };
  serialNumber: string;
  modelNumber: string;
  tagNumber: string;
  notes: string;
  billFlag: boolean;
  backupSuccesses: number;
  backupIncomplete: number;
  backupFailed: number;
  backupRestores: number;
  backupServerName: string;
  backupBillableSpaceGb: number;
  backupProtectedDeviceList: string;
  backupYear: number;
  backupMonth: number;
  questions: {
    answerId: number;
    questionId: number;
    question: string;
    answer?: string;
    sequenceNumber: number;
    numberOfDecimals: number;
    fieldType: string;
    requiredFlag: boolean;
  }[];
  activeFlag: boolean;
  mobileGuid: string;
  companyLocationId: number;
  showRemoteFlag: boolean;
  showAutomateFlag: boolean;
  needsRenewalFlag: boolean;
  _info: {
    lastUpdated: string;
    updatedBy: string;
    dateEntered: string;
    enteredBy: string;
  };
  customFields: {
    id: number;
    caption: string;
    type: string;
    entryMethod: string;
    numberOfDecimals: number;
    connectWiseId: string;
  }[];
};

export type ConnnectwiseConfigurationInfo = {
  name: string;
  configuration_href: string;
};

export type ConnectwiseTicketConfiguration = {
  id: number;
  deviceIdentifier: string;
  _info: ConnnectwiseConfigurationInfo;
};
