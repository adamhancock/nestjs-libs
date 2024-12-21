export type ConnectwiseServiceTicket = {
  id: number;
  summary: string;
  recordType: string;
  board: {
    id: number;
    name: string;
    _info: {
      board_href: string;
    };
  };
  status: {
    id: number;
    name: string;
    Sort: number;
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
      mobileGuid: string;
    };
  };
  site: {
    id: number;
    name: string;
    _info: {
      site_href: string;
      mobileGuid: string;
    };
  };
  siteName: string;
  city: string;
  contact: {
    id: number;
    name: string;
    _info: {
      mobileGuid: string;
      contact_href: string;
    };
  };
  contactName: string;
  contactPhoneNumber: string;
  contactEmailAddress: string;
  team: {
    id: number;
    name: string;
    _info: {
      team_href: string;
    };
  };
  priority: {
    id: number;
    name: string;
    sort: number;
    _info: {
      priority_href: string;
      image_href: string;
    };
  };
  serviceLocation: {
    id: number;
    name: string;
    _info: {
      location_href: string;
    };
  };
  source: {
    id: number;
    name: string;
    _info: {
      source_href: string;
    };
  };
  severity: string;
  impact: string;
  allowAllClientsPortalView: boolean;
  customerUpdatedFlag: boolean;
  automaticEmailContactFlag: boolean;
  automaticEmailResourceFlag: boolean;
  automaticEmailCcFlag: boolean;
  closedDate: string;
  closedBy: string;
  closedFlag: boolean;
  approved: boolean;
  estimatedExpenseCost: number;
  estimatedExpenseRevenue: number;
  estimatedProductCost: number;
  estimatedProductRevenue: number;
  estimatedTimeCost: number;
  estimatedTimeRevenue: number;
  billingMethod: string;
  subBillingMethod: string;
  dateResolved: string;
  dateResplan: string;
  dateResponded: string;
  resolveMinutes: number;
  resPlanMinutes: number;
  respondMinutes: number;
  isInSla: boolean;
  hasChildTicket: boolean;
  hasMergedChildTicketFlag: boolean;
  billTime: string;
  billExpenses: string;
  billProducts: string;
  location: {
    id: number;
    name: string;
    _info: {
      location_href: string;
    };
  };
  department: {
    id: number;
    identifier: string;
    name: string;
    _info: {
      department_href: string;
    };
  };
  mobileGuid: string;
  sla: {
    id: number;
    name: string;
    _info: {
      sla_href: string;
    };
  };
  currency: {
    id: number;
    symbol: string;
    currencyCode: string;
    decimalSeparator: string;
    numberOfDecimals: number;
    thousandsSeparator: string;
    negativeParenthesesFlag: boolean;
    displaySymbolFlag: boolean;
    currencyIdentifier: string;
    displayIdFlag: boolean;
    rightAlign: boolean;
    name: string;
    _info: {
      currency_href: string;
    };
  };
  _info: {
    lastUpdated: string;
    updatedBy: string;
    dateEntered: string;
    enteredBy: string;
    activities_href: string;
    scheduleentries_href: string;
    documents_href: string;
    configurations_href: string;
    tasks_href: string;
    notes_href: string;
    products_href: string;
    timeentries_href: string;
    expenseEntries_href: string;
  };
  escalationStartDateUTC: string;
  escalationLevel: number;
  minutesBeforeWaiting: number;
  respondedSkippedMinutes: number;
  resplanSkippedMinutes: number;
  respondedHours: number;
  respondedBy: string;
  resplanHours: number;
  resplanBy: string;
  resolutionHours: number;
  resolvedBy: string;
  minutesWaiting: number;
  customFields: {
    id: number;
    caption: string;
    type: string;
    entryMethod: string;
    numberOfDecimals: number;
    connectWiseId: string;
  }[];
};
