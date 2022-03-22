import { Injectable } from '@nestjs/common';
import { handleError } from '../util/error-handler';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { EntityManager } from '@mikro-orm/core';
import { EditTicketDto } from './dtos/edit-ticket.dto';
import { User } from '../users/entities/user.entity';
import { GetTicketsFilterDto } from './dtos/get-tickets-filter.dto';

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

    async getTickets(
        getTicketsFilterDto: GetTicketsFilterDto,
        user: User,
    ): Promise<Ticket[]> {
        try {
            const tickets = await this.em.find(Ticket, {});
            return tickets;
        } catch (e) {
            handleError(e);
        }
    }

    async editTicket(
        id: string,
        editTicketDto: EditTicketDto,
        user: User,
    ): Promise<Ticket> {}

    async deleteTicket(id: string, user: User): Promise<void> {}
}
