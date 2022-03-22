import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext): User => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user as User;
        return user;
    },
);
