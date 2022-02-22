import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
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
    async getTickets(): Promise<Ticket[]> {
        return this.ticketsService.getTickets();
    }
}
