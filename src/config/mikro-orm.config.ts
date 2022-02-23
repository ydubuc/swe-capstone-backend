import { Options } from '@mikro-orm/core';

const mikroOrmModuleOptions: Options = {
    entities: ['dist/**/*.entity{.ts,.js}'],
    entitiesTs: ['src/**/*.entity{.ts,.js}'],
    dbName: 'sqlite-db',
    type: 'sqlite',
};

export default mikroOrmModuleOptions;
