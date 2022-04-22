import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';

/*
this decorator is used to retrieve the user object from the request
the user object is only present if the request needs authentication
refer to the tickets.controller.ts file to see how it is used
*/
export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext): User => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user as User;
        return user;
    },
);
