import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-up')
    async signUp(): Promise<string> {
        return this.authService.signUp();
    }

    @Post('sign-in')
    async signIn(): Promise<string> {
        return this.authService.signIn();
    }
}
