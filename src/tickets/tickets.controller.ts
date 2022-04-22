import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GetUser } from '../users/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { EditTicketDto } from './dtos/edit-ticket.dto';
import { GetTicketsFilterDto } from './dtos/get-tickets-filter.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';

@UseGuards(ThrottlerGuard, AuthGuard())
@Controller('tickets')
export class TicketsController {
    constructor(private ticketsService: TicketsService) {}

    @Post()
    async createTicket(
        @Body() createTicketDto: CreateTicketDto,
        @GetUser() user: User,
    ): Promise<Ticket> {
        return this.ticketsService.createTicket(createTicketDto, user);
    }

    @Get()
    async getTickets(
        @Query() filterDto: GetTicketsFilterDto,
        @GetUser() user: User,
    ): Promise<Ticket[]> {
        return this.ticketsService.getTickets(filterDto, user);
    }

    @Get(':id')
    async getTicket(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Ticket> {
        return this.ticketsService.getTicket(id, user);
    }

    @Patch(':id')
    async editTicket(
        @Param('id', ParseIntPipe) id: number,
        @Body() editTicketDto: EditTicketDto,
        @GetUser() user: User,
    ): Promise<Ticket> {
        return this.ticketsService.editTicket(id, editTicketDto, user);
    }

    @Delete(':id')
    async deleteTicket(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.ticketsService.deleteTicket(id, user);
    }
}
