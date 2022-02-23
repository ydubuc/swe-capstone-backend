import { Injectable } from '@nestjs/common';
import { handleError } from '../util/error-handler';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { EntityManager } from '@mikro-orm/sqlite';

@Injectable()
export class TicketsService {
    constructor(private em: EntityManager) {}

    async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
        const ticket = new Ticket(createTicketDto);

        try {
            await this.em.persistAndFlush(ticket);
            return ticket;
        } catch (e) {
            handleError(e);
        }
    }

    async getTickets(): Promise<Ticket[]> {
        try {
            const tickets = await this.em.find(Ticket, {});
            return tickets;
        } catch (e) {
            handleError(e);
        }
    }
}