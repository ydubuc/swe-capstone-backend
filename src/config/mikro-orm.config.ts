import { Options } from '@mikro-orm/core';

const mikroOrmModuleOptions: Options = {
    entities: ['dist/**/*.entity{.ts,.js}'],
    entitiesTs: ['src/**/*.entity{.ts,.js}'],
    type: 'postgresql',
    // type: 'sqlite',
    // dbName: 'sqlite-db',
    clientUrl: process.env.DATABASE_URL,
    // clientUrl:
    //     'postgres://idddewcqhuummu:9a7e98b9419912abb2dc4125954133d6bc155a1ff5e3d03950588a9fe43625c0@ec2-52-207-74-100.compute-1.amazonaws.com:5432/der905e49rrvvl',
    driverOptions: {
        connection: { ssl: { rejectUnauthorized: false } },
    },
    migrations: {
        path: 'dist/migrations',
        pathTs: 'src/migrations',
    },
};

export default mikroOrmModuleOptions;
