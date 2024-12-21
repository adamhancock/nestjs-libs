type Info = {
  [key: string]: string;
};

type Status = {
  id: number;
  name: string;
  _info: Info;
};

type Country = {
  id: number;
  identifier: string;
  name: string;
  _info: Info;
};

type Territory = {
  id: number;
  name: string;
  _info: Info;
};

type Market = {
  id: number;
  name: string;
  _info: Info;
};

type Contact = {
  id: number;
  name: string;
  _info: Info;
};

type TimeZoneSetup = {
  id: number;
  name: string;
  _info: Info;
};

type TaxCode = {
  id: number;
  name: string;
  _info: Info;
};

type BillingTerms = {
  id: number;
  name: string;
};

type CustomField = {
  id: number;
  caption: string;
  type: string;
  entryMethod: string;
  numberOfDecimals: number;
  value?: string | boolean;
  connectWiseId: string;
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
  _info: Info;
};

type CompanyType = {
  id: number;
  name: string;
  _info: Info;
};

type Site = {
  id: number;
  name: string;
  _info: Info;
};

export type ConnectwiseCompany = {
  id: number;
  identifier: string;
  name: string;
  status: Status;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: Country;
  phoneNumber: string;
  faxNumber: string;
  website: string;
  territory: Territory;
  market: Market;
  accountNumber: string;
  defaultContact: Contact;
  dateAcquired: string;
  annualRevenue: number;
  timeZoneSetup: TimeZoneSetup;
  leadFlag: boolean;
  unsubscribeFlag: boolean;
  userDefinedField6: string;
  vendorIdentifier: string;
  taxIdentifier: string;
  taxCode: TaxCode;
  billingTerms: BillingTerms;
  billToCompany: {
    id: number;
    identifier: string;
    name: string;
    _info: Info;
  };
  billingSite: Site;
  billingContact: Contact;
  invoiceDeliveryMethod: {
    id: number;
    name: string;
  };
  invoiceToEmailAddress: string;
  deletedFlag: boolean;
  mobileGuid: string;
  currency: Currency;
  resellerIdentifier: string;
  isVendorFlag: boolean;
  types: CompanyType[];
  site: Site;
  _info: Info;
  customFields: CustomField[];
};
