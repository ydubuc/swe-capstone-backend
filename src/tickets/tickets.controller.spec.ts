import {
    Connection,
    IDatabaseDriver,
    MikroORM,
    Options,
} from '@mikro-orm/core';
import { SignUpDto } from '../auth/dtos/sign-up.dto';
import { User } from '../users/entities/user.entity';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { GetTicketsFilterDto } from './dtos/get-tickets-filter.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketPriority } from './enums/ticket-priority.enum';
import { TicketStatus } from './enums/ticket-status.enum';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

const mockMikroOrmOptions: Options = {
    entities: ['dist/**/*.entity{.ts,.js}'],
    entitiesTs: ['src/**/*.entity{.ts,.js}'],
    type: 'postgresql',
    clientUrl: 'localhost',
    driverOptions: {
        connection: { ssl: { rejectUnauthorized: false } },
    },
    migrations: {
        tableName: 'mikro_orm_migrations',
        path: 'dist/migrations',
        pathTs: 'src/migrations',
        glob: '!(*.d).{js,ts}',
    },
};

const mockSignUpDto: SignUpDto = {
    firstName: 'Tester',
    lastName: 'Testing',
    email: 'tester.testing@test.com',
    password: 'Test12345678',
};

const mockUser = new User(mockSignUpDto);

describe('TicketsController', () => {
    let orm: MikroORM<IDatabaseDriver<Connection>>;
    let ticketsController: TicketsController;
    let ticketsService: TicketsService;

    beforeAll(
        async () => (orm = await MikroORM.init(mockMikroOrmOptions, false)),
    );

    beforeEach(() => {
        ticketsService = new TicketsService(orm.em);
        ticketsController = new TicketsController(ticketsService);
    });

    describe('createTicket', () => {
        it('should return a new ticket', async () => {
            const dto: CreateTicketDto = {
                title: 'Testing title',
                description: 'Testing description',
                priority: TicketPriority.HIGH,
            };
            const result = new Ticket(dto);

            jest.spyOn(ticketsService, 'createTicket').mockImplementation(
                async () => result,
            );

            expect(await ticketsController.createTicket(dto, mockUser)).toBe(
                result,
            );
        });
    });

    describe('getTickets', () => {
        it('should return an array of tickets', async () => {
            const filterDto: GetTicketsFilterDto = {
                search: 'test',
                priority: TicketPriority.HIGH,
                status: TicketStatus.ACTIVE,
            };
            const dto: CreateTicketDto = {
                title: 'Testing title',
                description: 'Testing description',
                priority: TicketPriority.HIGH,
            };
            const result = [new Ticket(dto), new Ticket(dto)];

            jest.spyOn(ticketsService, 'getTickets').mockImplementation(
                async () => result,
            );

            expect(
                await ticketsController.getTickets(filterDto, mockUser),
            ).toBe(result);
        });
    });
});
