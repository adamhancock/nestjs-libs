type InfoHref = {
  [key: string]: string;
};

type Location = {
  id: number;
  name: string;
  _info: InfoHref;
};

type Department = {
  id: number;
  identifier: string;
  name: string;
  _info: InfoHref;
};

type SLA = {
  id: number;
  name: string;
  _info: InfoHref;
};

type BillingCycle = {
  id: number;
  name: string;
  _info: InfoHref;
};

type BillingTerms = {
  id: number;
  name: string;
};

type AgreementInfo = {
  lastUpdated: string;
  updatedBy: string;
  dateEntered: string;
  enteredBy: string;
};

export type ConnectwiseAgreementType = {
  id: number;
  name: string;
  prefixSuffixOption: string;
  defaultFlag: boolean;
  inactiveFlag: boolean;
  prePaymentFlag: boolean;
  invoicePreSuffix: string;
  location: Location;
  department: Department;
  restrictLocationFlag: boolean;
  restrictDepartmentFlag: boolean;
  sla: SLA;
  applicationUnits: string;
  applicationLimit: number;
  applicationCycle: string;
  applicationUnlimitedFlag: boolean;
  oneTimeFlag: boolean;
  coverAgreementTimeFlag: boolean;
  coverAgreementProductFlag: boolean;
  coverAgreementExpenseFlag: boolean;
  coverSalesTaxFlag: boolean;
  carryOverUnusedFlag: boolean;
  allowOverrunsFlag: boolean;
  expiredDays: number;
  limit: number;
  expireWhenZero: boolean;
  chargeToFirmFlag: boolean;
  employeeCompRate: string;
  employeeCompNotExceed: string;
  compHourlyRate: number;
  compLimitAmount: number;
  billingCycle: BillingCycle;
  billOneTimeFlag: boolean;
  billingTerms: BillingTerms;
  invoicingCycle: string;
  billAmount: number;
  taxableFlag: boolean;
  restrictDownPaymentFlag: boolean;
  invoiceDescription: string;
  topCommentFlag: boolean;
  bottomCommentFlag: boolean;
  billTime: string;
  billExpenses: string;
  billProducts: string;
  billableTimeInvoiceFlag: boolean;
  billableExpenseInvoiceFlag: boolean;
  billableProductInvoiceFlag: boolean;
  copyWorkRolesFlag: boolean;
  copyWorkTypesFlag: boolean;
  exclusionWorkRoleIds: number[];
  exclusionWorkTypeIds: number[];
  integrationXRef: string;
  prorateFlag: boolean;
  autoInvoiceFlag: boolean;
  invoiceProratedAdditionsFlag: boolean;
  _info: AgreementInfo;
};
