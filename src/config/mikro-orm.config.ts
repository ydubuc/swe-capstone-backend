import { Options } from '@mikro-orm/core';

const mikroOrmModuleOptions: Options = {
    entities: ['dist/**/*.entity{.ts,.js}'],
    entitiesTs: ['src/**/*.entity{.ts,.js}'],
    type: 'postgresql',
    clientUrl: process.env.DATABASE_URL,
    driverOptions: {
        connection: { ssl: { rejectUnauthorized: false } },
    },
    migrations: {
        path: 'dist/migrations',
        pathTs: 'src/migrations',
    },
};

export default mikroOrmModuleOptions;
