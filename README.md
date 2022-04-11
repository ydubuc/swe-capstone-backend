## Description

This is the backend repository of the SWE Capstone class for GTRI

## Installation

```bash
$ npm install
```

## Setup

1. Create a new .env.development and .env.production file in the root of the project (refer to .env.example)
2. Open src/config/mikro-orm.config.ts and change "type" to your preferred database ([refer to this page](https://mikro-orm.io/docs/configuration#driver))
3. Make sure you install your chosen database driver as a dependency ([refer to this page](https://mikro-orm.io/docs/usage-with-sql))

## Database Migrations

```
# to create the initial database schemas
$ npm run migration:create

# when schemas change
$ npm run migration:update

# to send changes to the database
$ npm run migration:up

# note: in case automatic migrations don't work using migration:up
# manually run the SQL generated in the migrations folder from your database
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This project is [MIT licensed](LICENSE).
