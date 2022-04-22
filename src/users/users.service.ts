import { EntityManager, FilterQuery } from '@mikro-orm/core';
import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from '../auth/dtos/sign-up.dto';
import { handleError } from '../util/error-handler';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { GetUsersFilterDto } from './dtos/get-users-filter.dto';

@Injectable()
export class UsersService {
    constructor(private em: EntityManager) {}

    async createUser(signUpDto: SignUpDto): Promise<void> {
        const user = new User(signUpDto);
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(signUpDto.password, user.salt);

        try {
            await this.em.persistAndFlush(user);
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException('Email already exists.');
            } else {
                handleError(e);
            }
        }
    }

    async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
        const { firstName, lastName } = filterDto;
        const query: FilterQuery<User> = {};

        if (firstName) {
            query.firstName = { $like: `%${firstName}%` };
        }
        if (lastName) {
            query.lastName = { $like: `%${lastName}%` };
        }

        try {
            const users = await this.em.find(User, query);
            return users;
        } catch (e) {
            handleError(e);
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const user = await this.em.findOne(User, { id });
            if (!user) {
                throw new NotFoundException('User not found.');
            }

            return user;
        } catch (e) {
            handleError(e);
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await this.em.findOne(User, { email });
            if (!user) {
                throw new NotFoundException('User not found.');
            }

            return user;
        } catch (e) {
            handleError(e);
        }
    }
}
