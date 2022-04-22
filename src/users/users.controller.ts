import { Controller, Get, Query } from '@nestjs/common';
import { GetUsersFilterDto } from './dtos/get-users-filter.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getUsers(@Query() filterDto: GetUsersFilterDto): Promise<User[]> {
        return this.usersService.getUsers(filterDto);
    }
}
