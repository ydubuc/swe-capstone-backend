import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';
import { CreateTicketDto } from '../dtos/create-ticket.dto';
import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';

@Entity()
export class Ticket {
    @PrimaryKey()
    id!: number;

    @Property()
    title: string;

    @Property()
    description: string;

    @Enum(() => TicketPriority)
    priority: TicketPriority;

    @Enum(() => TicketStatus)
    status: TicketStatus;

    @ManyToOne(() => User)
    user!: User;

    @Property({
        onUpdate: () => new Date(),
        onCreate: () => new Date(),
    })
    updatedAt: Date;

    @Property({ onCreate: () => new Date() })
    createdAt: Date;

    constructor(createTicketDto: CreateTicketDto) {
        this.title = createTicketDto.title;
        this.description = createTicketDto.description;
        this.priority = createTicketDto.priority;
        this.status = TicketStatus.ACTIVE;
    }
}
