import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { handleError } from '../util/error-handler';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signUp(signUpDto: SignUpDto): Promise<string> {
        try {
            await this.usersService.createUser(signUpDto);
            const token = await this.signIn({ ...signUpDto });
            return token;
        } catch (e) {
            handleError(e);
        }
    }

    async signIn(signInDto: SignInDto): Promise<string> {
        return 'jwt-token-placeholder';
    }
}
