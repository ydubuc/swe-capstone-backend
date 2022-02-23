import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';

@Module({
    imports: [MikroOrmModule.forRoot(), TicketsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}