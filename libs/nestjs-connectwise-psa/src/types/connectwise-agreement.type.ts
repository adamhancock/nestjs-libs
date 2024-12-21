type InfoHref = {
  [key: string]: string;
};

type Type = {
  id: number;
  name: string;
  _info: InfoHref;
};

type Company = {
  id: number;
  identifier: string;
  name: string;
  _info: InfoHref;
};

type Contact = {
  id: number;
  name: string;
  _info: InfoHref;
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

type TaxCode = {
  id: number;
  name: string;
  _info: InfoHref;
};

type InvoiceTemplate = {
  id: number;
  name: string;
  _info: InfoHref;
};

type Currency = {
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
  _info: InfoHref;
};

type CompanyLocation = {
  id: number;
  name: string;
  _info: InfoHref;
};

type CustomField = {
  id: number;
  caption: string;
  type: string;
  entryMethod: string;
  numberOfDecimals: number;
  connectWiseId: string;
};

type AgreementInfo = {
  lastUpdated: string;
  updatedBy: string;
  createdDate: string;
  createdBy: string;
};

export type ConnectwiseAgreement = {
  id: number;
  name: string;
  type: Type;
  company: Company;
  contact: Contact;
  customerPO: string;
  location: Location;
  department: Department;
  restrictLocationFlag: boolean;
  restrictDepartmentFlag: boolean;
  startDate: string;
  noEndingDateFlag: boolean;
  cancelledFlag: boolean;
  dateCancelled: string;
  reasonCancelled: string;
  workOrder: string;
  internalNotes: string;
  applicationUnits: string;
  applicationLimit: number;
  applicationUnlimitedFlag: boolean;
  oneTimeFlag: boolean;
  coverAgreementTime: boolean;
  coverAgreementProduct: boolean;
  coverAgreementExpense: boolean;
  coverSalesTax: boolean;
  carryOverUnused: boolean;
  allowOverruns: boolean;
  expiredDays: number;
  limit: number;
  expireWhenZero: boolean;
  chargeToFirm: boolean;
  employeeCompRate: string;
  compHourlyRate: number;
  compLimitAmount: number;
  billOneTimeFlag: boolean;
  invoicingCycle: string;
  billAmount: number;
  taxable: boolean;
  prorateFirstBill: number;
  billStartDate: string;
  taxCode: TaxCode;
  restrictDownPayment: boolean;
  prorateFlag: boolean;
  invoiceProratedAdditionsFlag: boolean;
  invoiceDescription: string;
  topComment: boolean;
  bottomComment: boolean;
  invoiceTemplate: InvoiceTemplate;
  billTime: string;
  billExpenses: string;
  billProducts: string;
  billableTimeInvoice: boolean;
  billableExpenseInvoice: boolean;
  billableProductInvoice: boolean;
  currency: Currency;
  autoInvoiceFlag: boolean;
  companyLocation: CompanyLocation;
  agreementStatus: string;
  _info: AgreementInfo;
  customFields: CustomField[];
};
