import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../auth/dtos/sign-up.dto';
import { handleError } from '../util/error-handler';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

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
            handleError(e);
        }
    }
}