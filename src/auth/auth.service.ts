import { Injectable } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
    async signUp(signUpDto: SignUpDto): Promise<string> {
        return 'jwt-token-placeholder';
    }

    async signIn(signInDto: SignInDto): Promise<string> {
        return 'jwt-token-placeholder';
    }
}
