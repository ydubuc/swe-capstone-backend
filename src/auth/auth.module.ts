import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWT_EXP } from './jwt/jwt-expiration';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: JWT_EXP },
        }),
        forwardRef(() => UsersModule),
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService],
    exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
