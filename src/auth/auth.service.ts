import {
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { handleError } from '../util/error-handler';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { AuthToken } from './interfaces/auth-token';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<AuthToken> {
        try {
            await this.usersService.createUser(signUpDto);
            const token = await this.signIn({ ...signUpDto });
            return token;
        } catch (e) {
            handleError(e);
        }
    }

    async signIn(signInDto: SignInDto): Promise<AuthToken> {
        const { email, password } = signInDto;

        try {
            const user = await this.verifyCredentials(email, password);
            const payload: JwtPayload = { id: user.id };
            const token = await this.jwtService.signAsync(payload);
            return { token };
        } catch (e) {
            handleError(e);
        }
    }

    async verifyCredentials(email: string, password: string): Promise<User> {
        try {
            const user = await this.usersService.getUserByEmail(email);
            if (user.password !== (await bcrypt.hash(password, user.salt))) {
                throw new UnauthorizedException('Invalid email or password.');
            }
            return user;
        } catch (e) {
            handleError(e);
        }
    }
}
