import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';

export class EditTicketDto {
    title: string;

    description: string;

    priority: TicketPriority;

    status: TicketStatus;
}
