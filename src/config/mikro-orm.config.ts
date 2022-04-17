import { Options } from '@mikro-orm/core';

// // development options
// const mikroOrmModuleOptions: Options = {
//     entities: ['dist/**/*.entity{.ts,.js}'],
//     entitiesTs: ['src/**/*.entity{.ts,.js}'],
//     type: 'postgresql',
//     dbName: 'test',
//     driverOptions: {
//         connection: { ssl: { rejectUnauthorized: false } },
//     },
//     migrations: {
//         tableName: 'mikro_orm_migrations',
//         path: 'dist/migrations',
//         pathTs: 'src/migrations',
//         glob: '!(*.d).{js,ts}',
//     },
// };

// production options
const mikroOrmModuleOptions: Options = {
    entities: ['dist/**/*.entity{.ts,.js}'],
    entitiesTs: ['src/**/*.entity{.ts,.js}'],
    type: 'postgresql',
    clientUrl:
        process.env.DATABASE_URL ||
        'postgres://ijzxwyrxzsgbcn:6652b74df19f3aa581f5a7a0cfb666822ce5dc08f32581f1fdba66df1ebc9ff3@ec2-34-194-158-176.compute-1.amazonaws.com:5432/d1m37bps9eq9ut',
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
