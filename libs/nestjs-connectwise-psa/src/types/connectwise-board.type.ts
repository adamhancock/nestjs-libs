export interface ConnectwiseBoard {
  id: number;
  name: string;
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
  inactiveFlag: boolean;
  signOffTemplate: {
    id: number;
    name: string;
    _info: {
      signOffTemplate_href: string;
    };
  };
  sendToContactFlag: boolean;
  sendToResourceFlag: boolean;
  projectFlag: boolean;
  billTicketsAfterClosedFlag: boolean;
  billTicketSeparatelyFlag: boolean;
  billUnapprovedTimeExpenseFlag: boolean;
  overrideBillingSetupFlag: boolean;
  workRole: {
    id: number;
    name: string;
    _info: {
      workRole_href: string;
    };
  };
  workType: {
    id: number;
    name: string;
    _info: {
      workType_href: string;
    };
  };
  billTime: string;
  billExpense: string;
  billProduct: string;
  autoAssignNewTicketsFlag: boolean;
  autoAssignNewECTicketsFlag: boolean;
  autoAssignNewPortalTicketsFlag: boolean;
  discussionsLockedFlag: boolean;
  timeEntryLockedFlag: boolean;
  notifyEmailFromName: string;
  closedLoopDiscussionsFlag: boolean;
  closedLoopResolutionFlag: boolean;
  closedLoopInternalAnalysisFlag: boolean;
  timeEntryDiscussionFlag: boolean;
  timeEntryResolutionFlag: boolean;
  timeEntryInternalAnalysisFlag: boolean;
  problemSort: string;
  resolutionSort: string;
  internalAnalysisSort: string;
  emailConnectorAllowReopenClosedFlag: boolean;
  emailConnectorReopenResourcesFlag: boolean;
  emailConnectorNewTicketNoMatchFlag: boolean;
  emailConnectorNeverReopenByDaysFlag: boolean;
  emailConnectorReopenDaysLimit: number;
  emailConnectorNeverReopenByDaysClosedFlag: boolean;
  emailConnectorReopenDaysClosedLimit: number;
  useMemberDisplayNameFlag: boolean;
  sendToCCFlag: boolean;
  autoAssignTicketOwnerFlag: boolean;
  autoAssignLimitFlag: boolean;
  autoAssignLimitAmount: number;
  closedLoopAllFlag: boolean;
  percentageCalculation: string;
  allSort: string;
  markFirstNoteIssueFlag: boolean;
  restrictBoardByDefaultFlag: boolean;
  sendToBundledFlag: boolean;
  _info: {
    lastUpdated: string;
    updatedBy: string;
  };
}
