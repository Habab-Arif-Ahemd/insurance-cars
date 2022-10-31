export interface TicketsParms {
  ticketStatusId: number[];
  pageNumber: number;
  pageSize: number;
}

export interface CreateTicket {
  ticketTypeId: number;
  clientId: string;
  body: string;
  files: any;
}

export interface TicketResponse {
  id: string;
  clientName: string;
  clientNameAr: string;
  ticketStatus: string;
  ticketStatusAr: string;
  ticketType: string;
  ticketTypeAr: string;
  ticketReferenceId: string;
  body: string;
  createdDate: string;
  closedDate: string;
  closedBy: string;
  totalUnReadMessages?: number;
}

export interface TicketFollowUp {
  createdDate: string;
  id?: string;
  message: string;
  sender: string;
  newMessage?: boolean;
}
