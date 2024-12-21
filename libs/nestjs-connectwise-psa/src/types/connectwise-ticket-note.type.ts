type Ticket = {
  id: number;
  summary: string;
  _info: Record<string, any>;
};

type Member = {
  id: number;
  identifier: string;
  name: string;
  _info: Record<string, any>;
};

type Info = {
  lastUpdated: string;
  updatedBy: string;
  dateEntered: string;
  enteredBy: string;
  sortByDate: string;
};

export type ConnectwiseTicketNote = {
  id: number;
  noteType: string;
  ticket: Ticket;
  text: string;
  detailDescriptionFlag: boolean;
  internalAnalysisFlag: boolean;
  resolutionFlag: boolean;
  bundledFlag: boolean;
  mergedFlag: boolean;
  issueFlag: boolean;
  createdByParentFlag: boolean;
  member: Member;
  _info: Info;
};
