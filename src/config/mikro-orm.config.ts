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
        tableName: 'mikro_orm_migrations',
        path: 'dist/migrations',
        pathTs: 'src/migrations',
        glob: '!(*.d).{js,ts}',
    },
};

export default mikroOrmModuleOptions;
