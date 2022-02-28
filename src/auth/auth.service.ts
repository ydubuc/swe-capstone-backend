import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async signUp(): Promise<string> {
        return 'jwt-token-placeholder';
    }

    async signIn(): Promise<string> {
        return 'jwt-token-placeholder';
    }
}
