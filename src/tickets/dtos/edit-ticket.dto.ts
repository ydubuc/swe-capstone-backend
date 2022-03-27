import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';

export class EditTicketDto {
    @IsOptional()
    @IsString()
    @Length(1, 256)
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(TicketPriority)
    priority: TicketPriority;

    @IsOptional()
    @IsEnum(TicketStatus)
    status: TicketStatus;
}
