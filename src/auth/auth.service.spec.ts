import {
    Connection,
    IDatabaseDriver,
    MikroORM,
    Options,
} from '@mikro-orm/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { JWT_EXP } from './jwt/jwt-expiration';
import * as bcrypt from 'bcryptjs';

const mockMikroOrmOptions: Options = {
    entities: ['dist/**/*.entity{.ts,.js}'],
    entitiesTs: ['src/**/*.entity{.ts,.js}'],
    type: 'postgresql',
    clientUrl: 'localhost',
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

const mockSignUpDto: SignUpDto = {
    firstName: 'Tester',
    lastName: 'Testing',
    email: 'tester.testing@test.com',
    password: 'Test12345678',
};

const mockUser = new User(mockSignUpDto);

describe('AuthService', () => {
    let orm: MikroORM<IDatabaseDriver<Connection>>;
    let authService: AuthService;
    let jwtService: JwtService;
    let usersService: UsersService;

    beforeAll(
        async () => (orm = await MikroORM.init(mockMikroOrmOptions, false)),
    );

    beforeEach(async () => {
        usersService = new UsersService(orm.em);
        jwtService = new JwtService({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: JWT_EXP },
        });
        authService = new AuthService(jwtService, usersService);
    });

    describe('verifyCredentials', () => {
        it('should check that plain password is validated with hash', async () => {
            const { email, password } = mockSignUpDto;

            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password, salt);

            const hashedMockUser = mockUser;
            hashedMockUser.salt = salt;
            hashedMockUser.password = hash;

            jest.spyOn(authService, 'verifyCredentials').mockImplementation(
                async () => hashedMockUser,
            );

            expect(
                (await authService.verifyCredentials(email, password)).password,
            ).toBe(hash);
        });
    });
});
