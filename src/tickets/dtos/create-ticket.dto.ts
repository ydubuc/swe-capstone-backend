import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { TicketPriority } from '../enums/ticket-priority.enum';

export class CreateTicketDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 256)
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsEnum(TicketPriority)
    readonly priority: TicketPriority;
}
