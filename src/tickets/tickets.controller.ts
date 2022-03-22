import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { EditTicketDto } from './dtos/edit-ticket.dto';
import { GetTicketsFilterDto } from './dtos/get-tickets-filter.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
    constructor(private ticketsService: TicketsService) {}

    @Post()
    async createTicket(
        @Body() createTicketDto: CreateTicketDto,
    ): Promise<Ticket> {
        return this.ticketsService.createTicket(createTicketDto);
    }

    @Get()
    async getTickets(
        @Body() getTicketsFilterDto: GetTicketsFilterDto,
        user: User,
    ): Promise<Ticket[]> {
        return this.ticketsService.getTickets();
    }

    @Patch(':id')
    async editTicket(
        @Param('id') id: string,
        @Body() editTicketDto: EditTicketDto,
    ): Promise<Ticket> {}

    @Delete(':id')
    async deleteTicket(@Param('id') id: string): Promise<void> {}
}
