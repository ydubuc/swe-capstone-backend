import { Options } from '@mikro-orm/core';

const mikroOrmModuleOptions = {
    entities: ['dist/**/*.entity{.ts,.js}'],
    entitiesTs: ['src/**/*.entity{.ts,.js}'],
    dbName: 'sqlite-db',
    type: 'sqlite',
} as Options;

export default mikroOrmModuleOptions;
