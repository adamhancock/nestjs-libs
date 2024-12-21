type Info = {
  filename?: string;
  document_href?: string;
  documentDownload_href?: string;
  directionalSync_href?: string;
  lastUpdated?: string;
  updatedBy?: string;
  location_href?: string;
  department_href?: string;
  member_href?: string;
  workRole_href?: string;
  workType_href?: string;
  timeZoneSetup_href?: string;
  image_href?: string;
};

type Photo = {
  id: number;
  name: string;
  _info: Info;
};

type SecurityRole = {
  id: number;
  name: string;
};

type Office365 = {
  id: string;
  name: string;
};

type DirectionalSync = {
  id: number;
  name: string;
  _info: Info;
};

type SsoSettings = {
  id: number;
  ssoUserId: string;
  _info: Info;
};

type Type = {
  id: number;
  name: string;
};

type TimeZone = {
  id: number;
  name: string;
  _info: Info;
};

type StructureLevel = {
  id: number;
  name: string;
  _info: Info;
};

type SecurityLocation = {
  id: number;
  name: string;
  _info: Info;
};

type DefaultLocation = {
  id: number;
  name: string;
  _info: Info;
};

type DefaultDepartment = {
  id: number;
  identifier: string;
  name: string;
  _info: Info;
};

type ReportsTo = {
  id: number;
  identifier: string;
  name: string;
  _info: Info;
};

type WorkRole = {
  id: number;
  name: string;
  _info: Info;
};

type WorkType = {
  id: number;
  name: string;
  _info: Info;
};

type Approver = {
  id: number;
  identifier: string;
  name: string;
  _info: Info;
};

type ServiceDefaultLocation = {
  id: number;
  name: string;
  _info: Info;
};

type SalesDefaultLocation = {
  id: number;
  name: string;
  _info: Info;
};

export type ConnectwiseMember = {
  id: number;
  identifier: string;
  disableOnlineFlag: boolean;
  licenseClass: string;
  notes: string;
  enableMobileGpsFlag: boolean;
  inactiveFlag: boolean;
  lastLogin: string;
  clientId: string;
  firstName: string;
  lastName: string;
  hireDate: string;
  photo: Photo;
  officeEmail: string;
  mobileEmail: string;
  homeEmail: string;
  defaultEmail: string;
  primaryEmail: string;
  officePhone: string;
  officeExtension: string;
  mobilePhone: string;
  mobileExtension: string;
  homePhone: string;
  homeExtension: string;
  defaultPhone: string;
  securityRole: SecurityRole;
  office365: Office365;
  mapiName: string;
  calendarSyncIntegrationFlag: boolean;
  timebasedOneTimePasswordActivated: boolean;
  enableLdapAuthenticationFlag: boolean;
  directionalSync: DirectionalSync;
  ssoSettings: SsoSettings;
  signature: string;
  phoneIntegrationType: string;
  useBrowserLanguageFlag: boolean;
  title: string;
  enableMobileFlag: boolean;
  type: Type;
  timeZone: TimeZone;
  partnerPortalFlag: boolean;
  stsUserAdminUrl: string;
  toastNotificationFlag: boolean;
  memberPersonas: any[];
  adminFlag: boolean;
  structureLevel: StructureLevel;
  securityLocation: SecurityLocation;
  defaultLocation: DefaultLocation;
  defaultDepartment: DefaultDepartment;
  reportsTo: ReportsTo;
  restrictLocationFlag: boolean;
  restrictDepartmentFlag: boolean;
  workRole: WorkRole;
  workType: WorkType;
  timeApprover: Approver;
  expenseApprover: Approver;
  billableForecast: number;
  dailyCapacity: number;
  hourlyCost: number;
  includeInUtilizationReportingFlag: boolean;
  requireExpenseEntryFlag: boolean;
  requireTimeSheetEntryFlag: boolean;
  requireStartAndEndTimeOnTimeEntryFlag: boolean;
  allowInCellEntryOnTimeSheet: boolean;
  enterTimeAgainstCompanyFlag: boolean;
  allowExpensesEnteredAgainstCompaniesFlag: boolean;
  timeReminderEmailFlag: boolean;
  daysTolerance: number;
  minimumHours: number;
  timeSheetStartDate: string;
  serviceDefaultLocation: ServiceDefaultLocation;
  restrictServiceDefaultLocationFlag: boolean;
  restrictServiceDefaultDepartmentFlag: boolean;
  excludedServiceBoardIds: number[];
  teams: number[];
  serviceBoardTeamIds: number[];
  restrictProjectDefaultLocationFlag: boolean;
  restrictProjectDefaultDepartmentFlag: boolean;
  excludedProjectBoardIds: any[];
  scheduleCapacity: number;
  restrictScheduleFlag: boolean;
  hideMemberInDispatchPortalFlag: boolean;
  salesDefaultLocation: SalesDefaultLocation;
  restrictDefaultSalesTerritoryFlag: boolean;
  restrictDefaultWarehouseFlag: boolean;
  restrictDefaultWarehouseBinFlag: boolean;
  companyActivityTabFormat: string;
  invoiceTimeTabFormat: string;
  invoiceScreenDefaultTabFormat: string;
  invoicingDisplayOptions: string;
  agreementInvoicingDisplayOptions: string;
  autoStartStopwatch: boolean;
  autoPopupQuickNotesWithStopwatch: boolean;
  globalSearchDefaultTicketFilter: string;
  globalSearchDefaultSort: string;
  phoneSource: string;
  _info: Info;
  copyPodLayouts: boolean;
  copySharedDefaultViews: boolean;
  copyColumnLayoutsAndFilters: boolean;
  fromMemberRecId: number;
  fromMemberTemplateRecId: number;
};
