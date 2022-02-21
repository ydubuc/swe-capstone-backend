import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmOptions: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'sqlite-db',
    autoLoadEntities: true,
    synchronize: false,
};
