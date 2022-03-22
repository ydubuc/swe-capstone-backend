import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';

export class GetTicketsFilterDto {
    @IsOptional()
    @IsString()
    search: string;

    @IsOptional()
    @IsEnum(TicketPriority)
    priority: TicketPriority;

    @IsOptional()
    @IsEnum(TicketStatus)
    status: TicketStatus;
}
