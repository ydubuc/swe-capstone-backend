import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmOptions } from './config/type-orm.options';

@Module({
    imports: [TypeOrmModule.forRootAsync({ useFactory: () => typeOrmOptions })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
