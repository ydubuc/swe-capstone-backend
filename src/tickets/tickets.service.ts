import { Injectable } from '@nestjs/common';
import { handleError } from '../util/error-handler';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { EditTicketDto } from './dtos/edit-ticket.dto';
import { User } from '../users/entities/user.entity';
import { GetTicketsFilterDto } from './dtos/get-tickets-filter.dto';

@Injectable()
export class TicketsService {
    constructor(private em: EntityManager) {}

    async createTicket(
        createTicketDto: CreateTicketDto,
        user: User,
    ): Promise<Ticket> {
        const ticket = new Ticket(createTicketDto);
        ticket.user = user;

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
        const { search, priority, status } = getTicketsFilterDto;
        const query: FilterQuery<Ticket> = {};
        query.user = user;

        if (search) {
            query.title = { $like: `%${search}%` };
            // TODO: add searching title and description at the same time
        }
        if (priority) {
            query.priority = priority;
        }
        if (status) {
            query.status = status;
        }

        try {
            const tickets = await this.em.find(Ticket, query);
            return tickets;
        } catch (e) {
            handleError(e);
        }
    }

    async editTicket(
        id: string,
        editTicketDto: EditTicketDto,
        user: User,
    ): Promise<Ticket> {
        return;
    }

    async deleteTicket(id: string, user: User): Promise<void> {
        return;
    }
}
