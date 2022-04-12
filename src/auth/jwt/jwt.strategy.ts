import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from './jwt-payload.interface';

/* note
the JwtStrategy is what is used to determine
if AuthGuard within controllers blocks a request or not.
it also determines how the JWT is extracted from the request.
*/

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    /* note
    every request protected by AuthGuard must pass this test
    an authenticated request should have the JWT inside the headers
    the JWT will be extracted into a JwtPayload which contains the user id
    we use the UsersService in order to retrieve the user if it exists
    */
    async validate(payload: JwtPayload): Promise<User> {
        try {
            const user = await this.usersService.getUserById(payload.id);
            return user;
        } catch (e) {
            throw new UnauthorizedException(e);
        }
    }
}
