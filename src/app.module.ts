import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MikroORM } from '@mikro-orm/core';

@Module({
    imports: [MikroOrmModule.forRoot(), TicketsModule, AuthModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private orm: MikroORM) {
        orm.getMigrator().up();
    }
}
